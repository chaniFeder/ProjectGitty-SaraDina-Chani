using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.ICustomerServices
{
    public interface ICase
    {
        List<Case> GetMyCases(string customerId);
    }
}
