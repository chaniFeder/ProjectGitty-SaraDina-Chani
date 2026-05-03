using Bl.Api.IAdvisorServices;
using Bl.Models.MortgagAdvisor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services.IAdvisorServices
{
    internal class CustomerService : ICustomer
    {
        public List<ICustomer> GetAllMyCustomers(int userId)
        {
            throw new NotImplementedException();
        }

        public bool RegisterNewCustomer(NewCustomerDto customer)
        {
            throw new NotImplementedException();
        }
    }
}
