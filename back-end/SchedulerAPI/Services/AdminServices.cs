using AutoMapper;
using SchedulerAPI.DAO;
using SchedulerAPI.DTO;
using SchedulerAPI.Model;
using SchedulerAPI.Repository;

namespace SchedulerAPI.Services
{
    /// <summary>
    /// Service class that handles administrative operations
    /// </summary>
    public class AdminServices : IAdminServices
    {
        private readonly IMapper mapper;
        private readonly IUserRepository userRepository;

        /// <summary>
        /// Constructor for AdminServices
        /// </summary>
        /// <param name="mapper">AutoMapper instance for object mapping</param>
        public AdminServices(IMapper mapper, IUserRepository userRepository)
        {
            this.mapper = mapper;
            this.userRepository = userRepository;
        }

        /// <summary>
        /// Creates a new user account
        /// </summary>
        /// <param name="accountUser">Account creation request data</param>
        /// <returns>True if account creation was successful, false otherwise</returns>
        public async Task<bool> CreateUserAccountAsync(CreateAccount accountUser)
        {
            try
            {
                // Validate that essential fields are provided
                if (string.IsNullOrEmpty(accountUser.Email) || string.IsNullOrEmpty(accountUser.Password))
                {
                    return false;
                }

                // Check if a user with the same email already exists
                var isAccountExists = await userRepository.GetUserByEmailAsync(accountUser.Email);
                if (isAccountExists != null)
                {
                    return false;
                }

                // Map DTO to entity model and save to database
                var user = mapper.Map<User>(accountUser);
                await userRepository.AddUserAsync(user);
                return true;
            }
            catch (Exception ex)
            {
                // Rethrow with more context
                throw new Exception($"An error occurred while processing the login request: {ex.Message}", ex);
            }
        }
    }
}
