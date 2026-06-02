using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.MortgagAdvisor
{
    public class MortgageProgramComparisonDto
    {
        public int BankId { get; set; }

        public string BankName { get; set; }

        public string ProgramName { get; set; }

        public double InterestRate { get; set; }

        public double MonthlyPayment { get; set; }

        public double TotalPayment { get; set; }
    }
}
