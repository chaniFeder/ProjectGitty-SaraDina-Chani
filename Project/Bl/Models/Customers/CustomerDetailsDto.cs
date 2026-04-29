using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.Customers
{
    internal class CustomerDetailsDto
    {
        public string CustomerId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public DateOnly? DateOfBirth { get; set; }

        public double? MonthlyIncome { get; set; }
    }
}
