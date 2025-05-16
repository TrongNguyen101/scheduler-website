using AutoMapper;
using SchedulerAPI.DTO;
using SchedulerAPI.Model;

namespace SchedulerAPI.Helper
{
    public class AutoMappingProfiles : Profile
    {
        /// <summary>
        /// Configures the mapping profiles for AutoMapper.
        /// </summary>
        public AutoMappingProfiles()
        {
            // Create mappings User and UserDTO
            CreateMap<User, UserDTO>();
            CreateMap<User, CreateAccount>();

            // Create mappings UserDTO and User
            CreateMap<UserDTO, User>();
            CreateMap<AddUserDTO, User>();

        }
    }
}
