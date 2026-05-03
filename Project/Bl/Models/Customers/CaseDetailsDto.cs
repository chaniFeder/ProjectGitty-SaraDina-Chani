using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.Customers
{
    internal class CaseDetailsDto
    {
        public int CaseId { get; set; }

        public string CaseType { get; set; }

        public string Status { get; set; }
        public string BankName { get; set;} = null!;
    }
}
