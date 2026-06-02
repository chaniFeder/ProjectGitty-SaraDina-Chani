using Bl.Models.Customers;
using Bl.Models.MortgagAdvisor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.IAdvisorServices
{
    internal interface ICustomer
    {
        public List<CustomerDetailsDto> GetAllMyCustomers(string userId);
        List<CustomerDetailsDto> GetAllMyCustomers(string userId);
        public bool RegisterNewCustomer(NewCustomerDto customer);
        bool RegisterNewCustomer(NewCustomerDto customer);
    }
}
