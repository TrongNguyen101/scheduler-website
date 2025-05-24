using SchedulerAPI.Model;

namespace SchedulerAPI.Repository
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllUsers();
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserById(int id);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);
        Task<string> GetRoleByEmail(string email);
        Task<User> GetUserByEmail(string email);
        IQueryable<User> GetUsersQueryable();
    }
}
