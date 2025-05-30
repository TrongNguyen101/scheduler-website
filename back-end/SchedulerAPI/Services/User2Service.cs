using SchedulerAPI.Model;

namespace SchedulerAPI.Services
{
    public class User2Service : BaseService<User>, IUser2Service
    {

        public User2Service(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {

        }

    }
}
