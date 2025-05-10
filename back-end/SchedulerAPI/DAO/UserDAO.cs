using Microsoft.EntityFrameworkCore;
using SchedulerAPI.DataContext;
using SchedulerAPI.Model;

namespace SchedulerAPI.DAO
{
    public class UserDAO
    {
        public async Task<List<User>> GetAllUsers()
        {
            using (var context = new SchedulerContext())
            {
                return await context.Users.ToListAsync();
            }
        }
    }   
}
