using Microsoft.AspNetCore.Mvc;
using SchedulerAPI.DTO;
using SchedulerAPI.Services;

namespace SchedulerAPI.Controllers
{
    /// <summary>
    /// API controller responsible for handling user-related HTTP requests.
    /// Provides endpoints for user management operations.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        #region Fields
        /// <summary>
        /// Service that provides user-related operations.
        /// </summary>
        private readonly IUserServices userServices;

        /// <summary>
        /// Logger for recording controller activities.
        /// </summary>
        private readonly ILogger<UserController> logger;
        #endregion

        #region Contructors
        /// <summary>
        /// Initializes a new instance of the <see cref="UserController"/> class.
        /// </summary>
        /// <param name="userServices">The user service implementation for handling user operations.</param>
        /// <param name="logger">The logger for recording controller activities.</param>
        public UserController(IUserServices userServices, ILogger<UserController> logger)
        {
            this.userServices = userServices;
            this.logger = logger;
        }
        #endregion

        #region Methods
        /// <summary>
        /// Retrieves all users from the system.
        /// </summary>
        /// <returns>
        /// 200 OK with a list of users if users exist.
        /// 404 Not Found if no users exist.
        /// 500 Internal Server Error if an exception occurs during processing.
        /// </returns>
        [HttpGet("Get")]
        public async Task<IActionResult> GetAllUsers()
        {
            logger.LogInformation("Fetching all users from the system.");
            try
            {
                var users = await userServices.ListAllUser();
                if (users == null || !users.Any())
                {
                    logger.LogWarning("No users found in the system.");
                    return NotFound("No users found.");
                }
                logger.LogInformation($"Total users found: {users.Count}");
                return Ok(new APIResponse
                {
                    Title = "User List",
                    Message = "Get list users from server successfully",
                    Data = users
                });
            }
            catch (Exception ex)
            {
                logger.LogError($"Error fetching users: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific user by their ID.
        /// </summary>
        /// <param name="id">The unique identifier of the user to retrieve.</param>
        /// <returns>
        /// 200 OK with the user data if found.
        /// 404 Not Found if the user does not exist.
        /// 500 Internal Server Error if an exception occurs during processing.
        /// </returns>
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            logger.LogInformation($"Fetching user with ID {id}.");
            try
            {
                var user = await userServices.GetUserByIdAsync(id);
                if (user == null)
                {
                    logger.LogWarning($"User with ID {id} not found.");
                    return NotFound($"User with ID {id} not found.");
                }
                logger.LogInformation($"User with ID {id} found.");
                return Ok(user);
            }
            catch (Exception ex)
            {
                logger.LogError($"Error fetching user with ID {id}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new user in the system.
        /// </summary>
        /// <param name="addUserDTO">The data transfer object containing user information.</param>
        /// <returns>
        /// 200 OK if the user is successfully added.
        /// 500 Internal Server Error if an exception occurs during processing.
        /// </returns>
        [HttpPost("Add")]
        public async Task<IActionResult> AddUser(AddUserDTO addUserDTO)
        {
            logger.LogInformation("Adding a new user.");
            try
            {
                if(!ModelState.IsValid)
                {
                    var errors = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(error => error.ErrorMessage)
                        .ToList();

                    logger.LogWarning("Invalid user data provided.");
                    return BadRequest(ModelState);
                }
                await userServices.AddUserAsync(addUserDTO);
                logger.LogInformation($"User with email {addUserDTO.Email} added successfully.");
                return Ok("User added successfully.");
            }
            catch (Exception ex)
            {
                logger.LogError($"Error adding user: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing user in the system.
        /// </summary>
        /// <param name="userDTO">The data transfer object containing updated user information.</param>
        /// <returns>
        /// 200 OK if the user is successfully updated.
        /// 404 Not Found if the user does not exist.
        /// 500 Internal Server Error if an exception occurs during processing.
        /// </returns>
        [HttpPatch("Update")]
        public async Task<IActionResult> UpdateUser(UserDTO userDTO)
        {
            logger.LogInformation($"Updating user with ID {userDTO.Id}.");
            try
            {
                var existingUser = await userServices.GetUserByIdAsync(userDTO.Id);
                if (existingUser == null)
                {
                    logger.LogWarning($"User with ID {userDTO.Id} not found.");
                    return NotFound($"User with ID {userDTO.Id} not found.");
                }
                await userServices.UpdateUserAsync(userDTO);
                logger.LogInformation($"User with ID {userDTO.Id} updated successfully.");
                return Ok("User updated successfully.");
            }
            catch (Exception ex)
            {
                logger.LogError($"Error updating user with ID {userDTO.Id}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            logger.LogInformation($"Deleting user with ID {id}.");
            try
            {
                var existingUser = await userServices.GetUserByIdAsync(id);
                if (existingUser == null)
                {
                    logger.LogWarning($"User with ID {id} not found.");
                    return NotFound($"User with ID {id} not found.");
                }
                await userServices.DeleteUserAsync(id);
                logger.LogInformation($"User with ID {id} deleted successfully.");
                return Ok("User deleted successfully.");
            }
            catch (Exception ex)
            {
                logger.LogError($"Error deleting user with ID {id}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
        #endregion
    }
}
