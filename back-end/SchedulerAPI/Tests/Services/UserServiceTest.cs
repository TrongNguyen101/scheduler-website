using AutoMapper;
using Moq;
using NUnit.Framework;
using SchedulerAPI.DTO;
using SchedulerAPI.Model;
using SchedulerAPI.Repository;
using SchedulerAPI.Services;
using System.Collections.Generic;

namespace SchedulerAPI.Tests.Services
{
    [TestFixture]
    public class UserServiceTests
    {
        // Mocked dependencies for the UserService
        private Mock<IUserRepository> _mockUserRepository;
        private Mock<IMapper> _mockMapper;

        // The service is going to test
        private UserServicescs _userServices;

        [SetUp]
        public void Setup()
        {
            // Initialize mocks and the service before each test
            _mockUserRepository = new Mock<IUserRepository>();
            _mockMapper = new Mock<IMapper>();
            _userServices = new UserServicescs(_mockUserRepository.Object, _mockMapper.Object);
        }

        // Test GetUserTest function
        [Test]
        public async Task GetUserTest()
        {
            // Arrange: Create sample data for domain model and DTO
            var data = new List<User> { new User { Id = 1, Name = "a", Email = "a.example@gmail.com", Password = "aaaaaa", Role = "Admin" } };
            var dataDTO = new List<UserDTO> { new UserDTO { Id = 1, Name = "a", Email = "a.example@gmail.com" } };

            // Setup repository and mapper behavior
            _mockUserRepository.Setup(x => x.GetAllUsers()).ReturnsAsync(data);
            _mockMapper.Setup(m => m.Map<List<UserDTO>>(data)).Returns(dataDTO);

            // Act: Call the method
            var result = await _userServices.ListAllUser();

            // Assert: Check if the result is not null and has one user
            Assert.IsNotNull(result);
            Assert.AreEqual(1, result.Count);
        }

        // Test add user when user does not exist
        [Test]
        public async Task AddUserAsync_ShouldCallAddUser_WhenUserDoesNotExist()
        {
            // Arrange: Prepare input DTO and mapped User entity
            var data = new AddUserDTO { Name = "a", Email = "a.example@gmail.com" };
            var user = new User { Id = 1, Name = "a", Email = "a.example@gmail.com", Password = "aaaaaa", Role = "Admin" };

            // Setup: User doesn't exist in the repository
            _mockUserRepository.Setup(x => x.GetUserByEmailAsync(data.Email)).ReturnsAsync((User)null);
            _mockMapper.Setup(m => m.Map<User>(data)).Returns(user);
            _mockUserRepository.Setup(x => x.AddUserAsync(user)).Returns(Task.CompletedTask);

            // Act: Call the method
            await _userServices.AddUserAsync(data);

            // Assert: Verify correct methods are called
            _mockUserRepository.Verify(r => r.AddUserAsync(It.Is<User>(u => u.Email == data.Email)), Times.Once);
            _mockUserRepository.Verify(r => r.GetUserByEmailAsync(data.Email), Times.Once);
            _mockMapper.Verify(m => m.Map<User>(data), Times.Once);
        }

        // Test add user when user exist
        [Test]
        public async Task AddUserAsync_ShouldCallAddUser_WhenUserExist()
        {
            // Arrange: Prepare input DTO and existing User entity
            var data = new AddUserDTO { Name = "a", Email = "a.example@gmail.com" };
            var user = new User { Id = 1, Name = "a", Email = "a.example@gmail.com", Password = "aaaaaa", Role = "Admin" };

            // Setup: User already exists
            _mockUserRepository.Setup(x => x.GetUserByEmailAsync(data.Email)).ReturnsAsync(user);
            _mockMapper.Setup(m => m.Map<User>(data)).Returns(user);
            _mockUserRepository.Setup(x => x.AddUserAsync(user)).Returns(Task.CompletedTask);

            // Act: Call the method
            await _userServices.AddUserAsync(data);

            // Assert: Ensure AddUserAsync is never called
            _mockUserRepository.Verify(r => r.AddUserAsync(It.Is<User>(u => u.Email == data.Email)), Times.Never);
            _mockUserRepository.Verify(r => r.GetUserByEmailAsync(data.Email), Times.Once);
            _mockMapper.Verify(m => m.Map<User>(data), Times.Never);
        }
    }
}