using SchedulerAPI.DTO;

namespace SchedulerAPI.Services
{
    public interface IUserServices
    {
        Task<List<UserDTO>> ListAllUser();
        Task<UserDTO> GetUserByIdAsync(int id);
        Task<bool> AddUserAsync(AddUserDTO addUserDTO);
        Task<bool> UpdateUserAsync(UserDTO userDTO);
        Task<bool> DeleteUserAsync(int id);
        Task<string> GetRoleByEmail(string email);
    }
}
