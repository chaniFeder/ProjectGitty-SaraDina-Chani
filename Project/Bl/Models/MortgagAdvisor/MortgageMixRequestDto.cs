using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.MortgagAdvisor
{
    internal class MortgageMixRequestDto
    {
        public int CaseId { get; set; }

        public string CaseType { get; set; } = null!;

        public virtual Bank? Bank { get; set; }
    }
}
