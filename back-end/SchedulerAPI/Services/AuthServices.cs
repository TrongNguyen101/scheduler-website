using SchedulerAPI.DAO;

namespace SchedulerAPI.Services
{
    public class AuthServices : IAuthServices
    {
        public async Task<bool> LoginAsync(string email, string password)
        {
            try
            {
                var user = await UserDAO.GetInstance().GetUserByEmailAsync(email);
                if (!user.Email.Equals(email) && !user.Password.Equals(password))
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while processing the login request: {ex.Message}", ex);
            }
        }
    }
}
