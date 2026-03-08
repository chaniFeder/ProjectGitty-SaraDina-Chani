using Dal.Models;

namespace Bl.Api
{
    public interface ICases
    {
        bool Create(Case item);
        List<Case> GetAll();
        List<Case> Search(Func<Case, bool> predicate);
        bool Delete(Case item);
        bool Update(Case item);
    }
}
