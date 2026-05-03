using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.Admin
{
    internal class SystemStatisticsDto
    {
        public int ActiveCases { get; set; }
        public decimal ExpectedRevenue { get; set; }
        public double ClosureRate { get; set; }
    }
}
