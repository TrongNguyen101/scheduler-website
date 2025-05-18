using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchedulerAPI.DTO;
using SchedulerAPI.Services;

namespace SchedulerAPI.Controllers
{
    /// <summary>
    /// Controller responsible for administrative operations in the Scheduler API.
    /// Provides endpoints for user account management and other administrative functions.
    /// Requires authentication for all endpoints.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AdminController : ControllerBase
    {
        #region Fields
        /// <summary>
        /// Service interface for administrative operations
        /// </summary>
        private readonly IAdminServices adminServices;

        /// <summary>
        /// Logger for recording controller activities and debugging information
        /// </summary>
        private readonly ILogger<AdminController> logger;
        #endregion

        #region Constructor
        /// <summary>
        /// Initializes a new instance of the AdminController class.
        /// Uses dependency injection to receive required services.
        /// </summary>
        /// <param name="adminServices">Service for handling administrative operations</param>
        /// <param name="logger">Logger for recording controller activities</param>
        public AdminController(IAdminServices adminServices, ILogger<AdminController> logger)
        {
            this.adminServices = adminServices;
            this.logger = logger;
        }
        #endregion

        #region Methods
        /// <summary>
        /// Creates a new user account in the system.
        /// This endpoint is restricted to users with Admin role.
        /// Records the email of the admin who created the account.
        /// </summary>
        /// <param name="accountUser">User account details including fullname, email, password, and role</param>
        /// <returns>
        /// 200 OK - If account creation is successful
        /// 400 Bad Request - If model validation fails or account creation fails
        /// 500 Internal Server Error - If an exception occurs during processing
        /// </returns>
        [HttpPost("Account/Create/User")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateAccountUser([FromBody] CreateAccount accountUser)
        {
            // Extract authenticated user's email from claims
            var AuthenticatedEmail = User.FindFirstValue(ClaimTypes.Email);
            logger.LogInformation($"Create account request received by email admin: {AuthenticatedEmail}");
            try
            {
                // Validate the model state before proceeding
                if (!ModelState.IsValid)
                {
                    logger.LogWarning($"Invalid model state for create account request: {ModelState}");
                    return BadRequest(ModelState);
                }

                // Record the admin who created this account
                accountUser.CreateByEmail = AuthenticatedEmail;

                // Attempt to create the user account
                var result = await adminServices.CreateUserAccountAsync(accountUser);
                if (result)
                {
                    logger.LogInformation($"Account created successfully by admin email: {AuthenticatedEmail}");
                    return Ok("Account created successfully.");
                }
                else
                {
                    logger.LogWarning($"Failed to create account by admin email: {AuthenticatedEmail}");
                    return BadRequest("Failed to create account.");
                }
            }
            catch (Exception ex)
            {
                // Log any exceptions that occur during account creation
                logger.LogError(ex, "An error occurred while creating the account.");
                return StatusCode(500, "Internal server error");
            }
        }
        #endregion
    }
}
