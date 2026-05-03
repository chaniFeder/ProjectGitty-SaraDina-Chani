using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.MortgagAdvisor
{
    internal class MortgageCaseDto
    {
        public int CaseId { get; set; }

        public string CaseType { get; set; } = null!;

        public string Status { get; set; } = null!;

        public int? BankId { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual Bank? Bank { get; set; }
    }
}
