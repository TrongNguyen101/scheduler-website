using SchedulerAPI.DAO;
using SchedulerAPI.DTO;

namespace SchedulerAPI.Services
{
    public class UserServicescs : IUserServices
    {
        public async Task<List<UserDTO>> ListAllUser()
        {
            var listUser = await UserDAO.GetInstance().GetAllUsers();
            return listUser.Select(user => new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email
            }).ToList();
        }
    }
}
