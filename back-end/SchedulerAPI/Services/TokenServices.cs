using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using SchedulerAPI.DAO;

namespace SchedulerAPI.Services
{
    public class TokenServices : ITokenServices
    {
        private readonly IConfiguration configuration;
        public TokenServices(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public async Task<string> GenerateTokenAsync(string email)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiryInMinutes = int.Parse(configuration["Jwt:ExpiryInMinutes"]);
            var role = await UserDAO.GetInstance().GetRoleByEmail(email);
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
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
