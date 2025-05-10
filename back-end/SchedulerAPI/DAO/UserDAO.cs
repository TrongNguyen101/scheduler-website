using Microsoft.EntityFrameworkCore;
using SchedulerAPI.DataContext;
using SchedulerAPI.DTO;
using SchedulerAPI.Model;

namespace SchedulerAPI.DAO
{
    public class UserDAO
    {
        public static volatile UserDAO Instance;
        public static readonly object lockObject = new object();
        public static UserDAO GetInstance()
        {
            if (Instance == null)
            {
                lock (lockObject)
                {
                    if (Instance == null)
                    {
                        Instance = new UserDAO();
                    }
                }
            }
            return Instance;
        }
        public async Task<List<User>> GetAllUsers()
        {
            using (var context = new SchedulerContext())
            {
                return await context.Users.ToListAsync();
            }
        }
    }   
}
