using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchedulerAPI.Model
{
    [Table("Users")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Column("Name")]    
        public string? Name { get; set; }
        [Column("Email")]
        public string? Email { get; set; }
        [Column("Password")]
        public string? Password { get; set; }
        [Column("Role")]
        public string? Role { get; set; }
    }
}
