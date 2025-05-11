using System.ComponentModel.DataAnnotations;

namespace SchedulerAPI.DTO
{
    public class AddUserDTO
    {
        public string? Name { get; set; }
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string? Email { get; set; }
    }
}
