using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    internal class CustomersService : ICustomers<Customer>
    {
        private dataManager dataManager;
        public CustomersService(dataManager dataManager)
        {
            this.dataManager = dataManager;
        }
        public bool Create(Customer item)
        {
            dataManager.Customers.Add(item);
            return dataManager.SaveChanges() > 0;
        }

        public bool Delete(Customer item)
        {
            dataManager.Customers.Remove(item);
            return dataManager.SaveChanges() > 0;
        }

        public List<Customer> GetAll()
        {
            return dataManager.Customers.ToList();
        }

        public List<Customer> Search(Func<Customer, bool> predicate)
        {
            return dataManager.Customers.Where(predicate).ToList();
        }

        public bool Update(Customer item)
        {
            dataManager.Customers.Update(item);
            return dataManager.SaveChanges() > 0;
        }
    }
}
