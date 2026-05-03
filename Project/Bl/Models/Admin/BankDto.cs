using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.Admin
{
    public class BankDto
    {

        public int BankCode { get; set; }

        public string? ContactPerson { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Email { get; set; } = null!;

        public bool? IsActive { get; set; }

        public double? MinLoanAmount { get; set; }

        public double? MaxLoanAmount { get; set; }
    }
}
