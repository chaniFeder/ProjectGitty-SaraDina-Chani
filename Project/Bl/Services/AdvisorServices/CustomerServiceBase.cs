using Bl.Models.Customers;
using Bl.Models.MortgagAdvisor;
using Dal.Api;
using Dal.Models;

namespace Bl.Services.IAdvisorServices
{
    public class CustomerServiceBase
    {
        private IDal dal { get; set; }
        public List<CustomerDetailsDto> GetAllMyCustomers(string userId)
        {

            return dal.Appointments
                .Search(a => a.UserId == userId)
                .Select(a => a.Customer)
                .Distinct()
                .Select(c => new CustomerDetailsDto
                {
                    CustomerId = c.CustomerId,
                    FirstName = c.FirstName,
                    LastName = c.LastName,
                    Email = c.Email,
                    PhoneNumber = c.PhoneNumber,
                    Address = c.Address,
                    DateOfBirth = c.DateOfBirth,
                    MonthlyIncome = c.MonthlyIncome
                })
                .ToList();
        }

        public bool RegisterNewCustomer(NewCustomerDto customer)
        {
            var existingCustomer = dal.Customers
                .Search(c => c.CustomerId == customer.CustomerId)
                .FirstOrDefault();

            if (existingCustomer != null)
                return false;

            Customer newCustomer = new Customer
            {
                CustomerId = customer.CustomerId,
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                Email = customer.Email,
                PhoneNumber = customer.PhoneNumber,
                Address = customer.Address,
                DateOfBirth = customer.DateOfBirth,
                MonthlyIncome = customer.MonthlyIncome,
                CreatedDate = DateTime.Now
            };

            return dal.Customers.Create(newCustomer);
        }
    }
}