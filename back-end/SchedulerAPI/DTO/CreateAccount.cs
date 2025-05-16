using System.ComponentModel.DataAnnotations;

namespace SchedulerAPI.DTO
{
    public class CreateAccount
    {
        [Required]
        public string? FullName { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string? Email { get; set; }
        [Required]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
        [MaxLength(20, ErrorMessage = "Password cannot exceed 20 characters")]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,20}$", ErrorMessage = "")]
        public string? Password { get; set; }
        [Required]
        public string? Role { get; set; }
    }
}
