using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SchedulerAPI.Repository;

namespace SchedulerAPI.Services
{
    /// <summary>
    /// Service responsible for JWT token generation and management
    /// </summary>
    public class TokenServices : ITokenServices
    {
        #region Fields
        private readonly IConfiguration configuration;
        private readonly IUserRepository userRepository;
        #endregion

        #region Constructor
        /// <summary>
        /// Initializes a new instance of the TokenServices class
        /// </summary>
        /// <param name="configuration">Configuration to access JWT settings</param>
        /// <param name="userRepository">Repository for user operations</param>
        public TokenServices(IConfiguration configuration, IUserRepository userRepository)
        {
            this.configuration = configuration;
            this.userRepository = userRepository;
        }
        #endregion

        #region Methods
        /// <summary>
        /// Generates a JWT token for authentication based on user email
        /// </summary>
        /// <param name="email">The email of the user to generate token for</param>
        /// <returns>JWT token string</returns>
        public async Task<string> GenerateTokenAsync(string email)
        {
            // Create encryption key using the secret from configuration
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));

            // Set the signing credentials with the key and algorithm
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Get token expiration time from configuration
            var expiryInMinutes = int.Parse(configuration["Jwt:ExpiryInMinutes"]);

            // Get user role from repository
            var role = await userRepository.GetRoleByEmail(email);

            // Create token descriptor with claims, issuer, audience, expiry and credentials
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                        new Claim(ClaimTypes.Email, email),
                        new Claim(ClaimTypes.Role, role)
                    }),
                Issuer = configuration["Jwt:Issuer"],
                Audience = configuration["Jwt:Audience"],
                Expires = DateTime.UtcNow.AddMinutes(expiryInMinutes),
                SigningCredentials = creds,
            };

            // Create token handler and generate token
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // Convert token to string and return
            return tokenHandler.WriteToken(token);
        }
        #endregion
    }
}
