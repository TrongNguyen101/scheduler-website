using SchedulerAPI.DAO;

namespace SchedulerAPI.Services
{
    public class AuthServices : IAuthServices
    {
        public async Task<string> LoginAsync(string email, string password)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                {
                    return null;
                }
                var user = await UserDAO.GetInstance().GetUserByEmailAsync(email);
                if(user == null)
                {
                    return null;
                }
                if(user.Password == password)
                {

                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while processing the login request.", ex);
            }
        }
    }
}
