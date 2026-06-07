using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.Admin
{
    public class MortgageProgramDto
    {
        public int ProgramId { get; set; }

        public int BankId { get; set; }

        public string? ProgramName { get; set; }

        public double InterestRate { get; set; }

        public double MaxLoanPercentage { get; set; }

        public double MinDownPayment { get; set; }

        public string? Description { get; set; }
    }
}
