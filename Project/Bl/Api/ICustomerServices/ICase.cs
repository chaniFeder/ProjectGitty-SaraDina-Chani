using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.ICustomerServices
{
    internal interface ICase
    {
        List<Case> GetMyCases(int customerId);
    }
}
