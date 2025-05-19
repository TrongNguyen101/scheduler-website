using AutoMapper;
using SchedulerAPI.DAO;
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
        private readonly IMapper mapperData;
        private readonly IUserRepository userRepository;
        #endregion

        #region Constructor
        /// <summary>
        /// Initializes a new instance of the <see cref="UserServicescs"/> class.
        /// </summary>
        /// <param name="userRepository">Repository for user data operations.</param>
        /// <param name="mapperData">The AutoMapper instance for object mapping.</param>
        public UserServicescs(IUserRepository userRepository, IMapper mapperData)
        {
            this.userRepository = userRepository;
            this.mapperData = mapperData;
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

        /// <summary>
        /// Retrieves a specific user by their ID.
        /// </summary>
        /// <param name="id">The ID of the user to retrieve.</param>
        /// <returns>A UserDTO containing the user's information, or null if not found.</returns>
        public async Task<UserDTO> GetUserByIdAsync(int id)
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

        /// <summary>
        /// Adds a new user to the database.
        /// </summary>
        /// <param name="userDTO">The user information to add.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        /// <remarks>
        /// This method checks if a user with the same email already exists but 
        /// doesn't currently handle this case. Consider implementing duplicate handling.
        /// </remarks>
        public async Task AddUserAsync(AddUserDTO userDTO)
        {
            // Check if user with email already exists 
            // TODO: Add proper handling for duplicate users
            var existingUser = await userRepository.GetUserByEmailAsync(userDTO.Email);

            // Map DTO to domain model
            var user = mapperData.Map<User>(userDTO);

            // Add user to database
            await userRepository.AddUserAsync(user);
        }

        /// <summary>
        /// Updates an existing user in the database.
        /// </summary>
        /// <param name="userDTO">The user information to update.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        public Task UpdateUserAsync(UserDTO userDTO)
        {
            // Map DTO to domain model
            var user = mapperData.Map<User>(userDTO);

            // Update user in database
            return userRepository.UpdateUserAsync(user);
        }

        /// <summary>
        /// Deletes a user from the database.
        /// </summary>
        /// <param name="id">The ID of the user to delete.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        public Task DeleteUserAsync(int id)
        {
            // Delete user from database
            return userRepository.DeleteUserAsync(id);
        }

        /// <summary>
        /// Retrieves a user's role based on their email address.
        /// </summary>
        /// <param name="email">The email address of the user.</param>
        /// <returns>The user's role as a string, or null if the user isn't found.</returns>
        public async Task<string> GetRoleByEmail(string email)
        {
            // Get user by email
            var user = await userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                // Return null when user not found
                return null;
            }
            else
            {
                // Return user's role
                return user.Role;
            }
        }
        #endregion
    }
}
