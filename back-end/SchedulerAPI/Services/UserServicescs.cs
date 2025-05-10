using SchedulerAPI.DAO;
using SchedulerAPI.DTO;

namespace SchedulerAPI.Services
{
    public class UserServicescs : IUserServices
    {
        public async Task<List<UserDTO>> ListAllUser()
        {
            var listUser = await UserDAO.GetAllUsers();
        }
    }
}
