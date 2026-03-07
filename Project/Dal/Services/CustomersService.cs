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
            throw new NotImplementedException();
        }

        public bool Delete(Customer item)
        {
            throw new NotImplementedException();
        }

        public List<Customer> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<Customer> Search(Func<Customer, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Customer item)
        {
            throw new NotImplementedException();
        }
    }
}
