using Bl.Models.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.ICustomerServices
{
    internal interface ICustomer
    {
        CustomerDetailsDto GetMyProfile(int customerId);
        void UpdateMyContactInfo(int customerId, ContactInfoDto dto);
    }
}
