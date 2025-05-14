using Microsoft.AspNetCore.Mvc;
using SchedulerAPI.DTO;
using SchedulerAPI.Services;

namespace SchedulerAPI.Controllers
{
    /// <summary>
    /// Controller responsible for authentication-related operations including user login
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ITokenServices tokenServices;
        private readonly IAuthServices authServices;
        private readonly ILogger<AuthController> logger;
        /// <summary>
        /// Constructor - initializes the controller with token service dependency
        /// </summary>
        /// <param name="tokenServices">Service for generating authentication tokens</param>
        public AuthController(ITokenServices tokenServices, 
            ILogger<AuthController> logger, 
            IAuthServices authServices)
        {
            this.authServices = authServices;
            this.tokenServices = tokenServices;
            this.logger = logger;
        }

        /// <summary>
        /// Authenticates a user and generates an authentication token
        /// </summary>
        /// <param name="request">Login request containing user email and password</param>
        /// <returns>
        /// 200 OK with token if authentication is successful
        /// 400 Bad Request if email or password is missing
        /// 401 Unauthorized if credentials are invalid
        /// </returns>
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            logger.LogInformation("Login request received for email: {Email}", request.Email);
            try
            {
                if (ModelState.IsValid)
                {
                    logger.LogWarning($"Invalid model state for login request: {ModelState}");
                    return BadRequest(ModelState);
                }
                var isUser = await authServices.LoginAsync(request.Email, request.Password);
                if(!isUser)
                {
                    logger.LogWarning("Invalid login attempt for email: {Email}", request.Email);
                    return Unauthorized("Invalid email or password");
                }
                var token = await tokenServices.GenerateTokenAsync(request.Email);
                return Ok(new APIResponse
                {
                    Title = "Login successful",
                    Message = "User authenticated successfully",
                    Data = token
                });
            }
            catch(Exception ex)
            {
                logger.LogError(ex, "An error occurred while processing the login request.");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
    }
}
