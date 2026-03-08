using Dal.Models;

namespace Bl.Api
{
    public interface IMortgagePrograms
    {
        bool Create(MortgageProgram item);
        List<MortgageProgram> GetAll();
        List<MortgageProgram> Search(Func<MortgageProgram, bool> predicate);
        bool Delete(MortgageProgram item);
        bool Update(MortgageProgram item);
    }
}
