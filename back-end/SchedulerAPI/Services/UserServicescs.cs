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
        private readonly IMapper mapperData;
        private readonly IUserRepository userRepository;

        public UserServicescs(IUserRepository userRepository, IMapper mapperData)
        {
            this.userRepository = userRepository;
            this.mapperData = mapperData;
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="UserServicescs"/> class.
        /// </summary>
        /// <param name="mapperData">The AutoMapper instance for object mapping.</param>
        public UserServicescs(IMapper mapperData)
        {
            this.mapperData = mapperData;
        }

        /// <summary>
        /// Retrieves all users from the database and maps them to DTOs.
        /// </summary>
        /// <returns>A list of UserDTO objects containing user information, or null if no users found.</returns>
        public async Task<List<UserDTO>> ListAllUser()
        {
            var data = await userRepository.GetAllUsers();
            if (data == null || !data.Any())
            {
                return null;
            }
            else
            {
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
            var user = await userRepository.GetUserById(id);
            if (user == null)
            {
                return null;
            }
            else
            {
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
            var existingUser = await userRepository.GetUserByEmailAsync(userDTO.Email);
            var user = mapperData.Map<User>(userDTO);
            await userRepository.AddUserAsync(user);
        }

        /// <summary>
        /// Updates an existing user in the database.
        /// </summary>
        /// <param name="userDTO">The user information to update.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        public Task UpdateUserAsync(UserDTO userDTO)
        {
            var user = mapperData.Map<User>(userDTO);
            return userRepository.UpdateUserAsync(user);
        }

        /// <summary>
        /// Deletes a user from the database.
        /// </summary>
        /// <param name="id">The ID of the user to delete.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        public Task DeleteUserAsync(int id)
        {
            return userRepository.DeleteUserAsync(id);
        }

        public async Task<string> GetRoleByEmail(string email)
        {
            var user = await userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return null;
            }
            else
            {
                return user.Role;
            }
        }
    }
}
