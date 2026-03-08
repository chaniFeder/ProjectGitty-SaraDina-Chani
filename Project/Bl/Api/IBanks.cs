using Dal.Models;

namespace Bl.Api
{
    public interface IBanks
    {
        bool Create(Bank item);
        List<Bank> GetAll();
        List<Bank> Search(Func<Bank, bool> predicate);
        bool Delete(Bank item);
        bool Update(Bank item);
    }
}
