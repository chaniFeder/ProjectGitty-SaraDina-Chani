using Dal.Models;

namespace Bl.Services
{
    public interface IUsersService
    {
        bool Create(User user);
        List<User> GetAll();
        User? GetById(string userId);
        bool Update(User user);
        bool Delete(string userId);
        User? Login(string username, string password);
    }
}
