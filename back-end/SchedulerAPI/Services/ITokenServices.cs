namespace SchedulerAPI.Services
{
    public interface ITokenServices
    {
        Task<string> GenerateToken(string email);
    }
}
