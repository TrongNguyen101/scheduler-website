using SchedulerAPI.DTO;

namespace SchedulerAPI.Services
{
    public interface IUserServices
    {
        Task<List<UserDTO>> ListAllUser();
        Task<UserDTO> GetUserByIdAsync(int id);
        Task AddUserAsync(AddUserDTO addUserDTO);
        Task UpdateUserAsync(UserDTO userDTO);
        Task DeleteUserAsync(int id);
    }
}
