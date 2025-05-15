namespace SchedulerAPI.Services
{
    public interface IAuthServices
    {
        Task<bool> LoginAsync(string email, string password);
    }
}
