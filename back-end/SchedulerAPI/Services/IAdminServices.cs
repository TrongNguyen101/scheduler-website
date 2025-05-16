using SchedulerAPI.DTO;

namespace SchedulerAPI.Services
{
    public interface IAdminServices
    {
        Task<bool> CreateUserAccountAsync(CreateAccount accountUser);
    }
}
