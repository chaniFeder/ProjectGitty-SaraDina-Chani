using Dal.Models;

namespace Bl.Api
{
    public interface ICustomers
    {
        bool Create(Customer item);
        List<Customer> GetAll();
        List<Customer> Search(Func<Customer, bool> predicate);
        bool Delete(Customer item);
        bool Update(Customer item);
    }
}
