using Dal.Models;

namespace Bl.Services
{
    public interface ICustomersService
    {
        bool Create(Customer customer);
        List<Customer> GetAll();
        Customer? GetById(string customerId);
        bool Update(Customer customer);
        bool Delete(string customerId);
    }
}
