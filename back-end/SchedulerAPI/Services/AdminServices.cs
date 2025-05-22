using AutoMapper;
using Microsoft.EntityFrameworkCore.Update;
using SchedulerAPI.DAO;
using SchedulerAPI.DataContext;
using SchedulerAPI.DTO;
using SchedulerAPI.Model;
using SchedulerAPI.Repository;

namespace SchedulerAPI.Services
{
    /// <summary>
    /// Service class that handles administrative operations related to user management
    /// </summary>
    public class AdminServices : IAdminServices
    {
        #region Fields
        private readonly SchedulerContext context;
        private readonly ILogger<AdminServices> logger;
        private readonly IMapper mapper;
        private readonly IUserRepository userRepository;
        #endregion

        #region Contructor
        /// <summary>
        /// Constructor for AdminServices
        /// </summary>
        /// <param name="mapper">AutoMapper instance for object mapping</param>
        /// <param name="userRepository">Repository for user data operations</param>
        public AdminServices(IMapper mapper,
            IUserRepository userRepository,
            SchedulerContext context,
            ILogger<AdminServices> logger)
        {
            this.context = context;
            this.mapper = mapper;
            this.userRepository = userRepository;
            this.logger = logger;
        }
        #endregion

        #region Methods
        /// <summary>
        /// Creates a new user account in the system
        /// </summary>
        /// <param name="accountUser">Account creation request data containing user details</param>
        /// <returns>True if account creation was successful, false otherwise</returns>
        /// <remarks>
        /// This method performs the following validations:
        /// - Checks if email and password are provided
        /// - Verifies that no existing user has the same email
        /// </remarks>
        public async Task<bool> CreateUserAccountAsync(CreateAccount accountUser)
        {
            using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                var existingUser = await userRepository.GetUserByEmailAsync(accountUser.Email);
                if (existingUser != null)
                {
                    logger.LogWarning("User with email {Email} already exists", accountUser.Email);
                    return false;
                }

                var newUser = mapper.Map<User>(accountUser);
                await userRepository.AddUserAsync(newUser);

                await transaction.CommitAsync();
                logger.LogInformation("User account created successfully for {Email}", accountUser.Email);
                return true;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                logger.LogError(ex, "Error occurred while creating user account for {Email}. Transaction has been rolled back.", accountUser.Email);
                throw;
            }
        }
        #endregion
    }
}
