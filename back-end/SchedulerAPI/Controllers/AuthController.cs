using Microsoft.AspNetCore.Mvc;
using SchedulerAPI.DTO;
using SchedulerAPI.Services;

namespace SchedulerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ITokenServices tokenServices;
        public AuthController(ITokenServices tokenServices)
        {
            this.tokenServices = tokenServices;
        }
        
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // Validate the request
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Email and password are required.");
            }
            // Authenticate the user
            var token = await tokenServices.GenerateToken(request.Email);
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized("Invalid email or password.");
            }
            // Return the token
            return Ok(new APIResponse
            {
                Title = "Login Successful",
                Message = "User authenticated successfully.",
                Data = token
            });
        }
    }
}
