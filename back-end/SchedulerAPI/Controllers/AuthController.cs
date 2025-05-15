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
        private readonly ITokenServices tokenServices;   // Service for JWT token generation
        private readonly IAuthServices authServices;     // Service for user authentication
        private readonly ILogger<AuthController> logger; // Logger for capturing authentication events

        /// <summary>
        /// Constructor - initializes the controller with required service dependencies
        /// </summary>
        /// <param name="tokenServices">Service for generating authentication tokens</param>
        /// <param name="logger">Logger for authentication operations</param>
        /// <param name="authServices">Service for user authentication</param>
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
            // Log the login attempt (sensitive operation)
            logger.LogInformation("Login request received for email: {Email}", request.Email);

            try
            {
                // Check if the request model is invalid (BUGFIX: should be !ModelState.IsValid)
                if (!ModelState.IsValid)
                {
                    // Log the validation failure with detailed info
                    logger.LogWarning($"Invalid model state for login request: {ModelState}");
                    return BadRequest(ModelState);
                }

                // Attempt to authenticate the user with provided credentials
                var isUser = await authServices.LoginAsync(request.Email, request.Password);

                // If authentication fails, return unauthorized response
                if (!isUser)
                {
                    logger.LogWarning("Invalid login attempt for email: {Email}", request.Email);
                    return Unauthorized("Invalid email or password");
                }

                // Generate JWT token for authenticated user
                var token = await tokenServices.GenerateTokenAsync(request.Email);

                // Return successful authentication response with token
                return Ok(new APIResponse
                {
                    Title = "Login successful",
                    Message = "User authenticated successfully",
                    Data = token
                });
            }
            catch (Exception ex)
            {
                // Log any unexpected errors during authentication
                logger.LogError(ex, "An error occurred while processing the login request.");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
    }
}
