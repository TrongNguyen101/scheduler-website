using Microsoft.EntityFrameworkCore;
using SchedulerAPI.Model;

namespace SchedulerAPI.DataContext
{
    public class SchedulerContext : DbContext
    {
        public SchedulerContext()
        {
        }
        public SchedulerContext(DbContextOptions<SchedulerContext> options) : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if(!optionsBuilder.IsConfigured)
            {
                IConfiguration configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();
                var connectionString = configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(new User 
            {
                Id = 1,
                Name = "John Doe",
                Email = "example@gmail.com",
            });
        }
    }
}
