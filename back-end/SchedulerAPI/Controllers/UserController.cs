using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchedulerAPI.DTO;
using SchedulerAPI.Services;

namespace SchedulerAPI.Controllers
{
    /// <summary>
    /// API controller responsible for handling user-related HTTP requests.
    /// Provides endpoints for user management operations such as creating, retrieving,
    /// updating, and deleting users.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        #region Fields
        /// <summary>
        /// Service that provides user-related operations.
        /// Injected through dependency injection.
        /// </summary>
        private readonly IUserServices userServices;
        private readonly IUser2Service  _user2Services;


        /// <summary>
        /// Logger for recording controller activities and errors.
        /// Helps with application monitoring and debugging.
        /// </summary>
        private readonly ILogger<UserController> logger;
        #endregion

        #region Contructors
        /// <summary>
        /// Initializes a new instance of the <see cref="UserController"/> class.
        /// Uses dependency injection to obtain required services.
        /// </summary>
        /// <param name="userServices">The user service implementation for handling user operations.</param>
        /// <param name="logger">The logger for recording controller activities.</param>
        public UserController(IUserServices userServices, ILogger<UserController> logger, IUser2Service user2Services)
        {
            // Store injected dependencies for use throughout the controller
            this.userServices = userServices;
            this.logger = logger;
            _user2Services = user2Services;
        }
        #endregion

        #region Methods
        /// <summary>
        /// Retrieves all users from the system.
        /// This endpoint is restricted to users with Admin role.
        /// </summary>
        /// <returns>
        /// 200 OK with a list of users if users exist.
        /// 404 Not Found if no users exist.
        /// 500 Internal Server Error if an exception occurs during processing.
        /// </returns>
        [Authorize(Roles = "Admin")]
        [HttpGet("Get")]
        public async Task<IActionResult> GetAllUsers()
        {
            // Log the start of the operation for tracking purposes
            logger.LogInformation("Fetching all users from the system.");
            try
            {
                // Retrieve all users from the service layer
                var users = await userServices.ListAllUser();

                // Check if any users were found
                if (users == null || !users.Any())
                {
                    return NotFound("No users found.");
                }

                return Ok(new APIResponse
                {
                    Title = "User List",
                    Message = "Get list users from server successfully",
                    Data = users
                });
            }
            catch (Exception ex)
            {
                // Log any exceptions that occur during processing
                logger.LogError($"Error fetching users: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific user by their ID.
        /// This endpoint is restricted to users with User role.
        /// </summary>
        /// <param name="id">The unique identifier of the user to retrieve.</param>
        /// <returns>
        /// 200 OK with the user data if found.
        /// 404 Not Found if the user does not exist.
        /// 500 Internal Server Error if an exception occurs during processing.
        /// </returns>
        [Authorize(Roles = "User")]
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            // Log the start of the operation with user ID for tracking
            logger.LogInformation($"Fetching user with ID {id}.");
            try
            {
              //  IQueryable query = _user2Services.SearchQuery();
                // Attempt to retrieve the user by ID
                var user = await userServices.GetUserByIdAsync(id);
                // Check if the user was found
                if (user == null)
                {
                    return NotFound($"User with ID {id} not found.");
                }

                // Return the found user with 200 OK status
                return Ok(user);
            }
            catch (Exception ex)
            {
                // Log any exceptions that occur during retrieval
                logger.LogError($"Error fetching user with ID {id}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new user in the system.
        /// This endpoint does not require authorization, allowing new users to register.
        /// </summary>
        /// <param name="addUserDTO">The data transfer object containing user information.</param>
        /// <returns>
        /// 200 OK if the user is successfully added.
        /// 400 Bad Request if the model state is invalid.
        /// 500 Internal Server Error if an exception occurs during processing.
        /// </returns>
        [HttpPost("Add")]
        public async Task<IActionResult> AddUser([FromBody] AddUserDTO addUserDTO)
        {
            // Log the start of user creation process
            logger.LogInformation("Adding a new user.");
            try
            {
                // Validate the user input using model validation
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                // Add the user via the service layer
                await userServices.AddUserAsync(addUserDTO);

                return Ok("User added successfully.");
            }
            catch (Exception ex)
            {
                // Log any exceptions during user creation
                logger.LogError($"Error adding user: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing user in the system.
        /// Uses PATCH method to allow partial updates of user information.
        /// </summary>
        /// <param name="userDTO">The data transfer object containing updated user information.</param>
        /// <returns>
        /// 200 OK if the user is successfully updated.
        /// 404 Not Found if the user does not exist.
        /// 500 Internal Server Error if an exception occurs during processing.
        /// </returns>
        [HttpPatch("Update")]
        public async Task<IActionResult> UpdateUser([FromBody] UserDTO userDTO)
        {
            // Log the start of user update operation
            logger.LogInformation($"Updating user with ID {userDTO.Id}.");
            try
            {
                // Verify that the user exists before attempting an update
                var existingUser = await userServices.GetUserByIdAsync(userDTO.Id);
                if (existingUser == null)
                {
                    return NotFound($"User with ID {userDTO.Id} not found.");
                }

                // Perform the update operation
                await userServices.UpdateUserAsync(userDTO);

                return Ok("User updated successfully.");
            }
            catch (Exception ex)
            {
                // Log any exceptions during update process
                logger.LogError($"Error updating user with ID {userDTO.Id}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes a user from the system by their ID.
        /// Permanently removes the user record from the database.
        /// </summary>
        /// <param name="id">The unique identifier of the user to delete.</param>
        /// <returns>
        /// 200 OK if the user is successfully deleted.
        /// 404 Not Found if the user does not exist.
        /// 500 Internal Server Error if an exception occurs during processing.
        /// </returns>
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            // Log the start of user deletion process
            logger.LogInformation($"Deleting user with ID {id}.");
            try
            {
                // Verify the user exists before attempting deletion
                var existingUser = await userServices.GetUserByIdAsync(id);
                if (existingUser == null)
                {
                    return NotFound($"User with ID {id} not found.");
                }

                // Perform the deletion operation
                await userServices.DeleteUserAsync(id);

                return Ok("User deleted successfully.");
            }
            catch (Exception ex)
            {
                // Log any exceptions during deletion
                logger.LogError($"Error deleting user with ID {id}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves the role assigned to a user by their email address.
        /// Used for authentication and authorization purposes.
        /// </summary>
        /// <param name="email">The email address of the user whose role is being queried.</param>
        /// <returns>
        /// 200 OK with the role name if found.
        /// 404 Not Found if no user with the specified email exists or has no assigned role.
        /// 500 Internal Server Error if an exception occurs during processing.
        /// </returns>
        [HttpGet("Get/Role/{email}")]
        public async Task<IActionResult> GetRoleByEmail(string email)
        {
            // Log the start of role retrieval operation
            logger.LogInformation($"Fetching role for user with email {email}.");
            try
            {
                // Request the role from the service layer
                var role = await userServices.GetRoleByEmail(email);

                // Check if a role was found
                if (string.IsNullOrEmpty(role))
                {
                    return NotFound($"No role found for user with email {email}.");
                }

                // Return the found role
                return Ok(role);
            }
            catch (Exception ex)
            {
                // Log any exceptions during role retrieval
                logger.LogError($"Error fetching role for user with email {email}: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
        #endregion
    }
}
