using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchedulerAPI.DTO;
using SchedulerAPI.Services;

namespace SchedulerAPI.Controllers
{
    /// <summary>
    /// Controller responsible for administrative operations in the Scheduler API.
    /// Provides endpoints for user account management and other administrative functions.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminServices adminServices;
        private readonly ILogger<AdminController> logger;

        /// <summary>
        /// Initializes a new instance of the AdminController class.
        /// </summary>
        /// <param name="adminServices">Service for handling administrative operations</param>
        /// <param name="logger">Logger for recording controller activities</param>
        public AdminController(IAdminServices adminServices, ILogger<AdminController> logger)
        {
            this.adminServices = adminServices;
            this.logger = logger;
        }

        /// <summary>
        /// Creates a new user account in the system.
        /// This endpoint is restricted to users with Admin role.
        /// </summary>
        /// <param name="accountUser">User account details including fullname, email, password, and role</param>
        /// <returns>
        /// 200 OK - If account creation is successful
        /// 400 Bad Request - If model validation fails or account creation fails
        /// 500 Internal Server Error - If an exception occurs during processing
        /// </returns>
        [HttpPost("Account/Create/User")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateAccountUser([FromBody] CreateAccount accountUser)
        {
            logger.LogInformation("Create account request received for email: {Email}", accountUser.Email);
            try
            {
                if(!User.Identity.IsAuthenticated)
                {
                    logger.LogWarning("Unauthorized access attempt to create account for email: {Email}", accountUser.Email);
                    return Unauthorized("User is not authenticated.");
                }
                if(!User.IsInRole("Admin"))
                {
                    logger.LogWarning("Unauthorized access attempt to create account for email: {Email}", accountUser.Email);
                    return Forbid("User does not have admin privileges.");
                }
                if (!ModelState.IsValid)
                {
                    logger.LogWarning($"Invalid model state for create account request: {ModelState}");
                    return BadRequest(ModelState);
                }
                var result = await adminServices.CreateUserAccountAsync(accountUser);
                if (result)
                {
                    logger.LogInformation("Account created successfully for email: {Email}", accountUser.Email);
                    return Ok("Account created successfully.");
                }
                else
                {
                    logger.LogWarning("Failed to create account for email: {Email}", accountUser.Email);
                    return BadRequest("Failed to create account.");
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while creating the account.");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
