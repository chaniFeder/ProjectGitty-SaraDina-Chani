using Dal.Models;

namespace Bl.Api
{
    public interface IUsers
    {
        bool Create(User item);
        List<User> GetAll();
        List<User> Search(Func<User, bool> predicate);
        bool Delete(User item);
        bool Update(User item);
    }
}
