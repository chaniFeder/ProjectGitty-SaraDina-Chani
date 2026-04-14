using Bl.Models.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    internal interface ICustomerApi
    {
        bool Login(string username, string password);
        bool Register(CustomerDetails details);
        CaseDetails GetDashboardData(int customerId);
        bool CreateNewCase(CaseDetails details);
    }
}
