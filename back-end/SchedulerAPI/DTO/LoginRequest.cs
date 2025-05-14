using System.ComponentModel.DataAnnotations;

namespace SchedulerAPI.DTO
{
    public class LoginRequest
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}
