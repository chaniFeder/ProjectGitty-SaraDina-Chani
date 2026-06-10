using Bl.Models.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.ICustomerServices
{
    public interface ICustomer
    {
        CustomerDetailsDto GetMyProfile(string customerId);
        void UpdateMyContactInfo(string customerId, ContactInfoDto dto);
    }
}
