using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SchedulerAPI.DataContext;
using SchedulerAPI.DTO;
using SchedulerAPI.Model;
using SchedulerAPI.Repository;

namespace SchedulerAPI.Services
{
    /// <summary>
    /// Service class that handles user-related operations.
    /// Acts as an intermediary between controllers and data access layer.
    /// </summary>
    public class UserServicescs : IUserServices
    {
        #region Fields
        private readonly SchedulerContext context;        // Database context for transaction management
        private readonly IMapper mapperData;
        private readonly IUserRepository userRepository;
        private readonly ILogger<UserServicescs> logger;   // Logger for recording service operations

        #endregion

        #region Constructor
        /// <summary>
        /// Initializes a new instance of the <see cref="UserServicescs"/> class.
        /// </summary>
        /// <param name="userRepository">Repository for user data operations.</param>
        /// <param name="mapperData">The AutoMapper instance for object mapping.</param>
        public UserServicescs(IUserRepository userRepository, IMapper mapperData, SchedulerContext context, ILogger<UserServicescs> logger)
        {
            this.userRepository = userRepository;
            this.mapperData = mapperData;
            this.context = context;
            this.logger = logger;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="UserServicescs"/> class with mapper only.
        /// Note: This constructor should only be used in specific testing scenarios.
        /// </summary>
        /// <param name="mapperData">The AutoMapper instance for object mapping.</param>
        public UserServicescs(IMapper mapperData)
        {
            this.mapperData = mapperData;
            // Warning: userRepository is null when using this constructor
        }
        #endregion

        #region Methods
        /// <summary>
        /// Retrieves all users from the database and maps them to DTOs.
        /// </summary>
        /// <returns>A list of UserDTO objects containing user information, or null if no users found.</returns>
        public async Task<List<UserDTO>> ListAllUser()
        {
            try
            {
                // Get all users from repository
                var data = await userRepository.GetAllUsers();
                if (data == null || !data.Any())
                {
                    // Return null when no users exist
                    return null;
                }
                else
                {
                    // Map domain models to DTOs
                    var userDTOs = mapperData.Map<List<UserDTO>>(data);
                    return userDTOs;
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while get all user");
                throw;
            }
        }

        /// <summary>
        /// Retrieves a specific user by their ID.
        /// </summary>
        /// <param name="id">The ID of the user to retrieve.</param>
        /// <returns>A UserDTO containing the user's information, or null if not found.</returns>
        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            try
            {
                // Get specific user by ID
                var user = await userRepository.GetUserById(id);
                if (user == null)
                {
                    // Return null when user not found
                    return null;
                }
                else
                {
                    // Map domain model to DTO
                    var userDTO = mapperData.Map<UserDTO>(user);
                    return userDTO;
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while get user by id {id}", id);
                throw;
            }
        }

        /// <summary>
        /// Adds a new user to the database.
        /// </summary>
        /// <param name="userDTO">The user information to add.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        /// <remarks>
        /// This method checks if a user with the same email already exists but 
        /// doesn't currently handle this case. Consider implementing duplicate handling.
        /// </remarks>
        public async Task<bool> AddUserAsync(AddUserDTO userDTO)
        {
            using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                // Check if user with email already exists 
                var existingUser = await userRepository.GetUserByEmailAsync(userDTO.Email);

                if (existingUser != null)
                {
                    // Log warning and return false without throwing exception for this business rule violation
                    logger.LogWarning("User with email {Email} already exists", userDTO.Email);
                    return false;
                }
                // Map DTO to domain model
                var user = mapperData.Map<User>(userDTO);

                // Add user to database
                await userRepository.AddUserAsync(user);

                // Commit the transaction if everything succeeded
                // This finalizes all database changes made within the transaction
                await transaction.CommitAsync();

                logger.LogInformation("User created successfully for {Email}", user.Email);
                return true;
            }
            catch (Exception ex)
            {
                // Rollback the transaction if any error occurs
                // This ensures database consistency by undoing all operations in this transaction
                await transaction.RollbackAsync();

                // Log detailed error information for troubleshooting
                logger.LogError(ex, "Error occurred while add new user");

                // Re-throw the exception for higher level handling
                // This allows calling methods to implement their own error handling strategies
                throw;
            }
        }

        /// <summary>
        /// Updates an existing user in the database.
        /// </summary>
        /// <param name="userDTO">The user information to update.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        public async Task<bool> UpdateUserAsync(UserDTO userDTO)
        {
            using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                // Check if user with email already exists 
                var existingUser = await userRepository.GetUsersQueryable().AnyAsync(u => u.Id != userDTO.Id && u.Email == userDTO.Email);

                if (existingUser)
                {
                    // Log warning and return false without throwing exception for this business rule violation
                    logger.LogWarning("User with email {Email} already exists", userDTO.Email);
                    return false;
                }

                // Map DTO to domain model
                var user = mapperData.Map<User>(userDTO);

                // Update user in database
                await userRepository.UpdateUserAsync(user);

                // Commit the transaction if everything succeeded
                // This finalizes all database changes made within the transaction
                await transaction.CommitAsync();
                logger.LogInformation("User updated successfully with email {Email}", user.Email);

                return true;
            }
            catch (Exception ex)
            {
                // Rollback the transaction if any error occurs
                // This ensures database consistency by undoing all operations in this transaction
                await transaction.RollbackAsync();

                // Log detailed error information for troubleshooting
                logger.LogError(ex, "Error occurred while update user with email {Email}", userDTO.Email);
                throw;
            }
        }

        /// <summary>
        /// Deletes a user from the database.
        /// </summary>
        /// <param name="id">The ID of the user to delete.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        public async Task<bool> DeleteUserAsync(int id)
        {
            using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                // Delete user from database
                await userRepository.DeleteUserAsync(id);

                // Commit the transaction if everything succeeded
                // This finalizes all database changes made within the transaction
                await transaction.CommitAsync();

                logger.LogInformation("User Deleted successfully with id {id}", id);
                return true;
            }
            catch (Exception ex)
            {
                // Rollback the transaction if any error occurs
                // This ensures database consistency by undoing all operations in this transaction
                await transaction.RollbackAsync();

                // Log detailed error information for troubleshooting
                logger.LogError(ex, "Error occurred while delete user with id {id}", id);
                throw;
            }
        }

        /// <summary>
        /// Retrieves a user's role based on their email address.
        /// </summary>
        /// <param name="email">The email address of the user.</param>
        /// <returns>The user's role as a string, or null if the user isn't found.</returns>
        public async Task<string> GetRoleByEmail(string email)
        {
            try
            {
                // Get user by email
                var user = await userRepository.GetUserByEmailAsync(email);
                if (user == null)
                {
                    // Return null when user not found
                    return null;
                }

                // Return user's role
                return user.Role;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while get role user by email {email}", email);
                throw;
            }
        }
        #endregion
    }
}
