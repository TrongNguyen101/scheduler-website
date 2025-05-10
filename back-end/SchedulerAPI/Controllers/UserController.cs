using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchedulerAPI.Services;

namespace SchedulerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices userServices;

        public UserController(IUserServices userServices)
        {
            this.userServices = userServices;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await userServices.ListAllUser();
                if (users == null || !users.Any())
                {
                    return NotFound("No users found.");
                }
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
    }
}
