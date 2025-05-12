using Microsoft.EntityFrameworkCore;
using SchedulerAPI.DataContext;
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
        /// <summary>
        /// Volatile instance ensures thread safety for double-check locking pattern
        /// </summary>
        public static volatile UserDAO Instance;

        /// <summary>
        /// Lock object for thread synchronization when creating the singleton instance
        /// </summary>
        public static readonly object lockObject = new object();

        /// <summary>
        /// Gets the singleton instance of UserDAO
        /// Implements double-checked locking pattern for thread safety
        /// </summary>
        /// <returns>The singleton instance of UserDAO</returns>
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
        /// <exception cref="Exception">Thrown when database operation fails</exception>
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

        /// <summary>
        /// Retrieves a user by their email address
        /// </summary>
        /// <param name="email">The email address to search for</param>
        /// <returns>A task that represents the asynchronous operation, containing the found user or null if not found</returns>
        /// <exception cref="Exception">Thrown when database operation fails</exception>
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

        /// <summary>
        /// Retrieves a user by their ID
        /// </summary>
        /// <param name="id">The ID of the user to retrieve</param>
        /// <returns>A task that represents the asynchronous operation, containing the found user or null if not found</returns>
        /// <exception cref="Exception">Thrown when database operation fails</exception>
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

        /// <summary>
        /// Adds a new user to the database
        /// </summary>
        /// <param name="user">The user object to add</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        /// <exception cref="Exception">Thrown when database operation fails</exception>
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

        /// <summary>
        /// Updates an existing user in the database
        /// </summary>
        /// <param name="user">The user object with updated information</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        /// <exception cref="Exception">Thrown when database operation fails</exception>
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

        /// <summary>
        /// Deletes a user from the database by their ID
        /// </summary>
        /// <param name="id">The ID of the user to delete</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        /// <exception cref="Exception">Thrown when database operation fails</exception>
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

        public async Task<string> GetRoleByEmail(string email)
        {
            using (var context = new SchedulerContext())
            {
                try
                {
                    var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
                    if (user != null)
                    {
                        return user.Role;
                    }
                    return null;
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error retrieving role for user with email {email}: {ex.Message}");
                }
            }
        }
        #endregion
    }
}
