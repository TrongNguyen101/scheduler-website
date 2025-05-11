using Microsoft.EntityFrameworkCore;
using SchedulerAPI.DataContext;
using SchedulerAPI.DTO;
using SchedulerAPI.Model;

namespace SchedulerAPI.DAO
{
    /// <summary>
    /// Data Access Object for User entity
    /// Implements the Singleton design pattern to ensure only one instance exists throughout the application
    /// Provides methods to interact with User data in the database
    /// </summary>
    public class UserDAO
    {
        #region Singleton Design Pattern
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
        #endregion

        #region Methods
        /// <summary>
        /// Retrieves all users from the database
        /// </summary>
        /// <returns>A task that represents the asynchronous operation, containing a list of all users</returns>
        public async Task<List<User>> GetAllUsers()
        {
            using (var context = new SchedulerContext())
            {
                try
                {
                    return await context.Users.ToListAsync();
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error retrieving users: {ex.Message}");
                }
            }
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            using (var context = new SchedulerContext())
            {
                try
                {
                    return await context.Users.FirstOrDefaultAsync(u => u.Email == email);
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error retrieving user with email {email}: {ex.Message}");
                }
            }
        }

        public async Task<User> GetUserById(int id)
        {
            using (var context = new SchedulerContext())
            {
                try
                {
                    return await context.Users.FindAsync(id);
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error retrieving user with ID {id}: {ex.Message}");
                }
            }
        }

        public async Task AddUserAsync(User user)
        {
            using (var context = new SchedulerContext())
            {
                try
                {
                    await context.Users.AddAsync(user);
                    await context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error adding user: {ex.Message}");
                }
            }
        }

        public async Task UpdateUserAsync(User user)
        {
            using (var context = new SchedulerContext())
            {
                try
                {
                    context.Users.Update(user);
                    await context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error updating user: {ex.Message}");
                }
            }
        }

        public async Task DeleteUserAsync(int id)
        {
            using (var context = new SchedulerContext())
            {
                try
                {
                    var user = await GetUserById(id);
                    if (user != null)
                    {
                        context.Users.Remove(user);
                        await context.SaveChangesAsync();
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error deleting user: {ex.Message}");
                }
            }
        }
        #endregion
    }
}
