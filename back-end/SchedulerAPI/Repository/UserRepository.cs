using Microsoft.EntityFrameworkCore;
using SchedulerAPI.DataContext;
using SchedulerAPI.Model;
using SchedulerAPI.Repository;

namespace SchedulerAPI.DAO
{
    /// <summary>
    /// Data Access Object for User entity
    /// Implements the Singleton design pattern to ensure only one instance exists throughout the application
    /// Provides methods to interact with User data in the database using Entity Framework Core
    /// </summary>
    public class UserRepository : IUserRepository
    {
        private readonly SchedulerContext context;

        #region Constructor
        public UserRepository(SchedulerContext schedulerContext)
        {
            this.context = schedulerContext;
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

        /// <summary>
        /// Retrieves a user by their email address
        /// Email is used as a unique identifier for finding specific users
        /// </summary>
        /// <param name="email">The email address to search for</param>
        /// <returns>A task that represents the asynchronous operation, containing the found user or null if not found</returns>
        /// <exception cref="Exception">Thrown when database operation fails</exception>
        public async Task<User> GetUserByEmailAsync(string email)
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

        /// <summary>
        /// Retrieves a user by their ID
        /// Uses Entity Framework Core's FindAsync method which is optimized for primary key lookups
        /// </summary>
        /// <param name="id">The ID of the user to retrieve</param>
        /// <returns>A task that represents the asynchronous operation, containing the found user or null if not found</returns>
        /// <exception cref="Exception">Thrown when database operation fails</exception>
        public async Task<User> GetUserById(int id)
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

        /// <summary>
        /// Adds a new user to the database
        /// Uses Entity Framework Core's AddAsync method for asynchronous operation
        /// </summary>
        /// <param name="user">The user object to add</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        /// <exception cref="Exception">Thrown when database operation fails</exception>
        public async Task AddUserAsync(User user)
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

        /// <summary>
        /// Updates an existing user in the database
        /// Uses Entity Framework Core's Update method to modify user information
        /// </summary>
        /// <param name="user">The user object with updated information</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        /// <exception cref="Exception">Thrown when database operation fails</exception>
        public async Task UpdateUserAsync(User user)
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

        /// <summary>
        /// Deletes a user from the database by their ID
        /// First retrieves the user to ensure they exist, then removes them
        /// </summary>
        /// <param name="id">The ID of the user to delete</param>
        /// <returns>A task that represents the asynchronous operation</returns>
        /// <exception cref="Exception">Thrown when database operation fails</exception>
        public async Task DeleteUserAsync(int id)
        {
            try
            {
                // Retrieve the user first to confirm they exist
                var user = await GetUserById(id);
                if (user != null)
                {
                    // Mark the entity for soft deletion in the context
                    user.IsDeleted = true;
                    context.Users.Update(user);
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

        /// <summary>
        /// Retrieves a user's role by their email address
        /// Used for authentication and authorization purposes
        /// </summary>
        /// <param name="email">The email address to search for</param>
        /// <returns>A task that represents the asynchronous operation, containing the user's role or null if user not found</returns>
        /// <exception cref="Exception">Thrown when database operation fails</exception>
        public async Task<string> GetRoleByEmail(string email)
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

        /// <summary>
        /// Retrieves a user by their email address (alternative method)
        /// This is a duplicate of GetUserByEmailAsync with a different method name
        /// </summary>
        /// <param name="email">The email address to search for</param>
        /// <returns>A task that represents the asynchronous operation, containing the found user or null if not found</returns>
        /// <exception cref="Exception">Thrown when database operation fails</exception>
        public async Task<User> GetUserByEmail(string email)
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

        /// <summary>
        /// Returns an <see cref="IQueryable{User}"/> that allows deferred execution of queries
        /// against the Users DbSet. This is useful for building dynamic filters or pagination
        /// in higher layers such as services.
        /// </summary>
        /// <returns>An <see cref="IQueryable{User}"/> for the Users table.</returns>
        public IQueryable<User> GetUsersQueryable()
        {
            return context.Users.AsQueryable();
        }

        #endregion
    }
}
