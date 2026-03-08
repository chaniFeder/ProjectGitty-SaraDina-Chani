using Dal.Models;

namespace Bl.Api
{
    public interface IPayments
    {
        bool Create(Payment item);
        List<Payment> GetAll();
        List<Payment> Search(Func<Payment, bool> predicate);
        bool Delete(Payment item);
        bool Update(Payment item);
    }
}
