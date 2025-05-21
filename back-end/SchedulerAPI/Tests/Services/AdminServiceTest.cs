using AutoMapper;
using Moq;
using NUnit.Framework;
using SchedulerAPI.DTO;
using SchedulerAPI.Model;
using SchedulerAPI.Repository;
using SchedulerAPI.Services;

namespace SchedulerAPI.Tests.Services
{
    [TestFixture]
    public class AdminServiceTest
    {
        // Mocked dependencies for IUserRepository and IMapper
        private Mock<IUserRepository> _mockUserrepository;
        private Mock<IMapper> _mockMapper;

        // The service is going to test
        private AdminServices _adminService;

        [SetUp]
        public void Setup()
        {
            // Initialize mocks and the service before each test
            _mockUserrepository = new Mock<IUserRepository>();
            _mockMapper = new Mock<IMapper>();
            _adminService = new AdminServices(_mockMapper.Object, _mockUserrepository.Object);
        }

        // Test create user account when user does not exist
        [Test]
        public async Task CreateUserAccountAsync_WhenUserDoesNotExist()
        {
            // Arrange: Prepare input data and expected mapped user
            var account = new CreateAccount { Name = "Test", Email = "a.example@gmail.com", Password = "Test001", Role = "User" };
            var user = new User { Id = 1, Name = "Test", Email = "a.example@gmail.com", Password = "Test001", Role = "User" };

            // Setup mock behavior: user does not exist
            _mockUserrepository.Setup(r => r.GetUserByEmailAsync(account.Email)).ReturnsAsync((User)null);
            _mockMapper.Setup(m => m.Map<User>(account)).Returns(user);
            _mockUserrepository.Setup(r => r.AddUserAsync(user)).Returns(Task.CompletedTask);

            // Act: Call the service method
            await _adminService.CreateUserAccountAsync(account);

            // Assert: Verify that repository and mapper methods were called appropriately
            _mockUserrepository.Verify(r => r.GetUserByEmailAsync(account.Email), Times.Once);
            _mockMapper.Verify(m => m.Map<User>(account), Times.Once);
            _mockUserrepository.Verify(r => r.AddUserAsync(It.Is<User>(user => user.Email == account.Email)), Times.Once);
        }
    }
}
