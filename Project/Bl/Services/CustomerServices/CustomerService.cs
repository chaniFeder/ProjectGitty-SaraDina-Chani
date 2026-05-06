using Bl.Api.ICustomerServices;
using Bl.Models.Customers;
using Dal.Api;

namespace Bl.Services.CustomerServices
{
    public class CustomerService : ICustomer
    {
        private IDal dal { get; set; }
        public CustomerService(IDal dal)
        {
            this.dal = dal;
        }

        CustomerDetailsDto ICustomer.GetMyProfile(int customerId)
        {
            var customer = dal.Customers.Search(c => c.CustomerId == customerId.ToString()).FirstOrDefault();
            if (customer == null) return null;
            return new CustomerDetailsDto
            {
                CustomerId = customer.CustomerId,
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Email = customer.Email,
                PhoneNumber = customer.PhoneNumber,
                Address = customer.Address,
                DateOfBirth = customer.DateOfBirth,
                MonthlyIncome = customer.MonthlyIncome
            };
        }

        void ICustomer.UpdateMyContactInfo(int customerId, ContactInfoDto dto)
        {
            var customer = dal.Customers.Search(c => c.CustomerId == customerId.ToString()).FirstOrDefault();
            if (customer == null) return;
            customer.Email = dto.Email;
            customer.PhoneNumber = dto.PhoneNumber;
            dal.Customers.Update(customer);
        }
    }
}
