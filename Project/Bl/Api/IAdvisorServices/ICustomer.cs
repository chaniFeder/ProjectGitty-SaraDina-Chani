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
        List<ICustomer> GetAllMyCustomers(int userId);

        bool RegisterNewCustomer(NewCustomerDto customer);


    }
}
