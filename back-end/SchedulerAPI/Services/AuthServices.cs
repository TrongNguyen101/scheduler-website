using SchedulerAPI.Repository;

namespace SchedulerAPI.Services
{
    /// <summary>
    /// Provides authentication services for the application.
    /// This service handles user authentication by verifying credentials against stored user data.
    /// </summary>
    public class AuthServices : IAuthServices
    {
        #region Fields
        private readonly IUserRepository userRepository;
        #endregion

        #region Constructor
        /// <summary>
        /// Initializes a new instance of the AuthServices class.
        /// </summary>
        /// <param name="userRepository">Repository for user data access</param>
        public AuthServices(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        #endregion

        #region Methods
        /// <summary>
        /// Authenticates a user by email and password.
        /// </summary>
        /// <param name="email">User's email address</param>
        /// <param name="password">User's password (plain text)</param>
        /// <returns>True if authentication is successful, otherwise false</returns>
        /// <exception cref="Exception">Thrown when an error occurs during authentication</exception>
        /// <remarks>
        /// The authentication process:
        /// 1. Retrieves user by email
        /// 2. If user exists, verifies the provided password against stored hash
        /// 3. Returns authentication result
        /// 
        /// Uses BCrypt for secure password verification.
        /// </remarks>
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
                // Using BCrypt to securely verify the password against stored hash
                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.Password);
                return isPasswordValid;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while processing the login request: {ex.Message}", ex);
            }
        }
        #endregion
    }
}
