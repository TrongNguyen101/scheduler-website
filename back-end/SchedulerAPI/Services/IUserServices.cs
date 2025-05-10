using SchedulerAPI.DTO;

namespace SchedulerAPI.Services
{
    public interface IUserServices
    {
        Task<List<UserDTO>> ListAllUser();
    }
}
