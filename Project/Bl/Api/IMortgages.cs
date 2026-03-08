using Dal.Models;

namespace Bl.Api
{
    public interface IMortgages
    {
        bool Create(Mortgage item);
        List<Mortgage> GetAll();
        List<Mortgage> Search(Func<Mortgage, bool> predicate);
        bool Delete(Mortgage item);
        bool Update(Mortgage item);
    }
}
