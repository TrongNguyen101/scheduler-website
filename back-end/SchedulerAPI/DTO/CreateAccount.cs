using System.ComponentModel.DataAnnotations;

namespace SchedulerAPI.DTO
{
    public class CreateAccount
    {
        [Required(ErrorMessage = "Fullname is required")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        [StringLength(20, MinimumLength = 8,
        ErrorMessage = "Password must be between 8 and 20 characters")]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,20}$", 
        ErrorMessage = "Password must contain at least one uppercase letter, one lowercase letter, and one digit")]
        public string? Password { get; set; }
        [Required]
        public string? Role { get; set; }
        public string? CreateByEmail { get; set; }
    }
}
