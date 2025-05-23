using Microsoft.EntityFrameworkCore;
using SchedulerAPI.Model;

namespace SchedulerAPI.DataContext
{
    /// <summary>
    /// Database context class that provides access to database tables and manages the ORM functionality.
    /// This class inherits from EF Core's DbContext and configures the database connection.
    /// </summary>
    public class SchedulerContext : DbContext
    {
        /// <summary>
        /// Default constructor used for design-time activities like migrations
        /// </summary>
        public SchedulerContext()
        {
        }

        /// <summary>
        /// Constructor that accepts DbContextOptions, typically used with dependency injection
        /// </summary>
        /// <param name="options">Configuration options for the context</param>
        public SchedulerContext(DbContextOptions<SchedulerContext> options) : base(options)
        {
        }

        /// <summary>
        /// DbSet representing the Users table in the database
        /// </summary>
        public virtual DbSet<User> Users { get; set; }

        /// <summary>
        /// Configures the database connection if not already configured
        /// Uses connection string from appsettings.json
        /// </summary>
        /// <param name="optionsBuilder">Builder used to create or modify options for this context</param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfiguration configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();
                var connectionString = configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        /// <summary>
        /// Configures the database model and seeds initial data
        /// </summary>
        /// <param name="modelBuilder">Builder used to construct the model for this context</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed the Users table with initial user data
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Name = "John Doe",
                Email = "john.example@gmail.com",
                Password = "$2a$11$dc7/3OhfDj1DxaWofWX0mOOm75jJbOinhP4srvGlmyMKg/xHDMQb2",
                Role = "Admin",
                CreateByEmail = null,
            },
            new User
            {
                Id = 2,
                Name = "Jane Smith",
                Email = "jane.example@gmail.com",
                Password = "$2a$11$dc7/3OhfDj1DxaWofWX0mOOm75jJbOinhP4srvGlmyMKg/xHDMQb2",
                Role = "Lecturer",
                CreateByEmail = "john.example@gmail.com"
            });
        }
    }
}
