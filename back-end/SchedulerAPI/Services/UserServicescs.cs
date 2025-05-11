using AutoMapper;
using SchedulerAPI.DAO;
using SchedulerAPI.DTO;
using SchedulerAPI.Model;

namespace SchedulerAPI.Services
{
    /// <summary>
    /// Service class that handles user-related operations
    /// Acts as an intermediary between controllers and data access layer
    /// </summary>
    public class UserServicescs : IUserServices
    {
        private readonly IMapper mapperData;

        public UserServicescs(IMapper mapperData)
        {
            this.mapperData = mapperData;
        }
        /// <summary>
        /// Retrieves all users from the database and maps them to DTOs
        /// </summary>
        /// <returns>A list of UserDTO objects containing user information</returns>
        public async Task<List<UserDTO>> ListAllUser()
        {
            var data = await UserDAO.GetInstance().GetAllUsers();
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

        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var user = await UserDAO.GetInstance().GetUserById(id);
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

        public async Task AddUserAsync(AddUserDTO userDTO)
        {
            var existingUser = await UserDAO.GetInstance().GetUserByEmailAsync(userDTO.Email);
            var user = mapperData.Map<User>(userDTO);
            await UserDAO.GetInstance().AddUserAsync(user);
        }

        public Task UpdateUserAsync(UserDTO userDTO)
        {
            var user = mapperData.Map<User>(userDTO);
            return UserDAO.GetInstance().UpdateUserAsync(user);
        }

        public Task DeleteUserAsync(int id)
        {
            return UserDAO.GetInstance().DeleteUserAsync(id);
        }
    }
}
