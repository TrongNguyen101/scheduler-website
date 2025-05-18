using AutoMapper;
using SchedulerAPI.DAO;
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
        private readonly IMapper mapper;
        private readonly IUserRepository userRepository;
        #endregion

        #region Contructor
        /// <summary>
        /// Constructor for AdminServices
        /// </summary>
        /// <param name="mapper">AutoMapper instance for object mapping</param>
        /// <param name="userRepository">Repository for user data operations</param>
        public AdminServices(IMapper mapper, IUserRepository userRepository)
        {
            this.mapper = mapper;
            this.userRepository = userRepository;
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
            try
            {
                // Validate that essential fields are provided
                if (string.IsNullOrEmpty(accountUser.Email) || string.IsNullOrEmpty(accountUser.Password))
                {
                    // Required data is missing
                    return false;
                }

                // Check if a user with the same email already exists
                var isAccountExists = await userRepository.GetUserByEmailAsync(accountUser.Email);
                if (isAccountExists != null)
                {
                    // Email is already in use
                    return false;
                }

                // Map DTO to entity model and save to database
                var user = mapper.Map<User>(accountUser);
                await userRepository.AddUserAsync(user);
                return true;
            }
            catch (Exception ex)
            {
                // Rethrow with more context specific to account creation
                throw new Exception($"An error occurred while creating the user account: {ex.Message}", ex);
            }
        }
        #endregion
    }
}
