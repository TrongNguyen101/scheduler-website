using System.ComponentModel.DataAnnotations;

namespace SchedulerAPI.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string? Email { get; set; }
    }
}
