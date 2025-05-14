namespace SchedulerAPI.Services
{
    public interface IAuthServices
    {
        Task<string> LoginAsync(string email, string password);
    }
}
