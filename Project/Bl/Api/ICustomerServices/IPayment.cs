using Bl.Models.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.ICustomerServices
{
    public interface IPayment
    {
        List<PaymentScheduleItemDto> GetMyPaymentSchedule(string mortgageId);
    }
}
