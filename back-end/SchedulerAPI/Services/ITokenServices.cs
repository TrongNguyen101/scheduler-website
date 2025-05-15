namespace SchedulerAPI.Services
{
    public interface ITokenServices
    {
        Task<string> GenerateTokenAsync(string email);
    }
}
