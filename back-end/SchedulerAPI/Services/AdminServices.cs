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
    /// Service class that handles administrative operations related to user management.
    /// Responsible for implementing business logic for user account administration.
    /// </summary>
    public class AdminServices : IAdminServices
    {
        #region Fields
        private readonly SchedulerContext context;        // Database context for transaction management
        private readonly ILogger<AdminServices> logger;   // Logger for recording service operations
        private readonly IMapper mapper;                  // AutoMapper for object-to-object mapping
        private readonly IUserRepository userRepository;  // Repository for user data operations
        #endregion

        #region Contructor
        /// <summary>
        /// Constructor for AdminServices that initializes all required dependencies
        /// </summary>
        /// <param name="mapper">AutoMapper instance for object mapping</param>
        /// <param name="userRepository">Repository for user data operations</param>
        /// <param name="context">Database context for transaction management</param>
        /// <param name="logger">Logger for recording service operations</param>
        public AdminServices(IMapper mapper,
            IUserRepository userRepository,
            SchedulerContext context,
            ILogger<AdminServices> logger)
        {
            // Dependency injection initialization
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        #endregion

        #region Methods
        /// <summary>
        /// Creates a new user account in the system with transaction support
        /// </summary>
        /// <param name="accountUser">Account creation request data containing user details</param>
        /// <returns>True if account creation was successful, false otherwise</returns>
        /// <remarks>
        /// This method performs the following validations:
        /// - Checks if email and password are provided
        /// - Verifies that no existing user has the same email
        /// Uses transactions to ensure data integrity - either the entire operation succeeds or fails
        /// </remarks>
        public async Task<bool> CreateUserAccountAsync(CreateAccount accountUser)
        {
            // Input validation
            if (accountUser == null)
            {
                logger.LogError("Account user data cannot be null");
                throw new ArgumentNullException(nameof(accountUser));
            }

            // Start a transaction to ensure data consistency
            // This guarantees that all database operations either complete successfully or are rolled back
            using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                // Check if a user with the same email already exists
                // This prevents duplicate user accounts and ensures email uniqueness
                var existingUser = await userRepository.GetUserByEmailAsync(accountUser.Email);
                if (existingUser != null)
                {
                    // Log warning and return false without throwing exception for this business rule violation
                    logger.LogWarning("User with email {Email} already exists", accountUser.Email);
                    return false;
                }

                // Password security: Hash the password before storing it
                // Using BCrypt for one-way hashing with salt for security
                accountUser.Password = BCrypt.Net.BCrypt.HashPassword(accountUser.Password);

                // Map DTO to entity model and add to repository
                // AutoMapper handles the property mapping from CreateAccount DTO to User entity
                var newUser = mapper.Map<User>(accountUser);
                await userRepository.AddUserAsync(newUser);

                // Commit the transaction if everything succeeded
                // This finalizes all database changes made within the transaction
                await transaction.CommitAsync();
                logger.LogInformation("User account created successfully for {Email}", accountUser.Email);
                return true;
            }
            catch (Exception ex)
            {
                // Rollback the transaction if any error occurs
                // This ensures database consistency by undoing all operations in this transaction
                await transaction.RollbackAsync();

                // Log detailed error information for troubleshooting
                logger.LogError(ex, "Error occurred while creating user account for {Email}. Transaction has been rolled back.", accountUser.Email);

                // Re-throw the exception for higher level handling
                // This allows calling methods to implement their own error handling strategies
                throw;
            }
        }
        #endregion
    }
}
