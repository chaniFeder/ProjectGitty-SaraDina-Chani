using Bl.Api.ICustomerServices;
using Bl.Models.Customers;
using Dal.Api;

namespace Bl.Services.CustomerServices
{
    public class PaymentService : IPayment
    {
        private IDal dal { get; set; }
        public PaymentService(IDal dal)
        {
            this.dal = dal;
        }

        List<PaymentScheduleItemDto> IPayment.GetMyPaymentSchedule(string mortgageId)
        {
            return dal.Payments
                .Search(p => p.MortgageId.ToString() == mortgageId)
                .Select(p => new PaymentScheduleItemDto
                {
                    PaymentDate = p.PaymentDate.ToDateTime(TimeOnly.MinValue),
                    PaymentAmount = p.PaymentAmount
                }).ToList();
        }
    }
}
