using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.MortgagAdvisor
{
    public class MortgageMixRequestDto
    {
        public int CaseId { get; set; }

        public string CaseType { get; set; } = null!;

        public int BankId { get; set; }

        public double LoanAmount { get; set; }

        public double PropertyValue { get; set; }

        public double DownPayment { get; set; }

        public int LoanTermYears { get; set; }

        public double MonthlyIncome { get; set; }
    }
}