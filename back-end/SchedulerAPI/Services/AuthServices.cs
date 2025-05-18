using SchedulerAPI.DAO;
using SchedulerAPI.Repository;

namespace SchedulerAPI.Services
{
    /// <summary>
    /// Provides authentication services for the application.
    /// </summary>
    public class AuthServices : IAuthServices
    {
        private readonly IUserRepository userRepository;
        public AuthServices(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        /// <summary>
        /// Authenticates a user by email and password.
        /// </summary>
        /// <param name="email">User's email address</param>
        /// <param name="password">User's password</param>
        /// <returns>True if authentication is successful, otherwise false</returns>
        /// <exception cref="Exception">Thrown when an error occurs during authentication</exception>
        public async Task<bool> LoginAsync(string email, string password)
        {
            try
            {
                var user = await userRepository.GetUserByEmailAsync(email);

                // If user not found, return false
                if (user == null)
                {
                    return false;
                }

                // Check if both email and password match
                // Note: In production, passwords should be hashed and compared securely
                return user.Email.Equals(email) && user.Password.Equals(password);
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while processing the login request: {ex.Message}", ex);
            }
        }
    }
}
