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
        /// The volatile keyword prevents compiler optimizations that could make the double-check fail
        /// </summary>
        public static volatile UserDAO Instance;

        /// <summary>
        /// Lock object for thread synchronization when creating the singleton instance
        /// Used to prevent multiple threads from creating instances simultaneously
        /// </summary>
        public static readonly object lockObject = new object();

        /// <summary>
        /// Gets the singleton instance of UserDAO
        /// Implements double-checked locking pattern for thread safety and performance
        /// First check outside lock for performance, second check inside lock for thread safety
        /// </summary>
        /// <returns>The singleton instance of UserDAO</returns>
        public static UserDAO GetInstance()
        {
            // First check (not thread-safe but fast)
            if (Instance == null)
            {
                // Lock for thread safety
                lock (lockObject)
                {
                    // Second check (thread-safe)
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
        /// Uses Entity Framework Core to query the database asynchronously
        /// </summary>
        /// <returns>A task that represents the asynchronous operation, containing a list of all users</returns>
        /// <exception cref="Exception">Thrown when database operation fails</exception>
        public async Task<List<User>> GetAllUsers()
        {
            // Create a new database context with using statement to ensure proper disposal
            using (var context = new SchedulerContext())
            {
                try
                {
                    // Asynchronously retrieve all users from the database
                    return await context.Users.ToListAsync();
                }
                catch (Exception ex)
                {
                    // Wrap and rethrow exception with contextual information
                    throw new Exception($"Error retrieving users: {ex.Message}");
                }
            }
        }

        /// <summary>
        /// Retrieves a user by their email address
        /// Email is used as a unique identifier for finding specific users
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
                    // Find the first user matching the email or return null if none found
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
        /// Uses Entity Framework Core's FindAsync method which is optimized for primary key lookups
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
                    // FindAsync is optimized for primary key lookups
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
        /// Uses Entity Framework Core's AddAsync method for asynchronous operation
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
                    // Track the new user entity in the context
                    await context.Users.AddAsync(user);
                    // Persist changes to the database
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
        /// Uses Entity Framework Core's Update method to modify user information
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
                    // Mark the entity as modified in the context
                    context.Users.Update(user);
                    // Persist changes to the database
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
        /// First retrieves the user to ensure they exist, then removes them
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
                    // Retrieve the user first to confirm they exist
                    var user = await GetUserById(id);
                    if (user != null)
                    {
                        // Mark the entity for deletion in the context
                        context.Users.Remove(user);
                        // Persist changes to the database
                        await context.SaveChangesAsync();
                    }
                    // If user is null, no action is taken (silently handle non-existent user)
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error deleting user: {ex.Message}");
                }
            }
        }

        /// <summary>
        /// Retrieves a user's role by their email address
        /// Used for authentication and authorization purposes
        /// </summary>
        /// <param name="email">The email address to search for</param>
        /// <returns>A task that represents the asynchronous operation, containing the user's role or null if user not found</returns>
        /// <exception cref="Exception">Thrown when database operation fails</exception>
        public async Task<string> GetRoleByEmail(string email)
        {
            using (var context = new SchedulerContext())
            {
                try
                {
                    // Find the user by email
                    var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
                    if (user != null)
                    {
                        // Return the role if user exists
                        return user.Role;
                    }
                    // Return null if user not found
                    return null;
                }
                catch (Exception ex)
                {
                    throw new Exception($"Error retrieving role for user with email {email}: {ex.Message}");
                }
            }
        }

        public async Task<User> GetUserByEmail(string email)
        {
            using(var context = new SchedulerContext())
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
        #endregion
    }
}
