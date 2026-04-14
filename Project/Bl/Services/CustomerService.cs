using Bl.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    internal class CustomerService : ICustomerApi
    {
        public bool CreateNewCase(CaseDetails details)
        {
            throw new NotImplementedException();
        }

        public CaseDetails GetDashboardData(int customerId)
        {
            throw new NotImplementedException();
        }

        public bool Login(string username, string password)
        {
            throw new NotImplementedException();
        }

        public bool Register(CustomerDetails details)
        {
            throw new NotImplementedException();
        }
    }
}
