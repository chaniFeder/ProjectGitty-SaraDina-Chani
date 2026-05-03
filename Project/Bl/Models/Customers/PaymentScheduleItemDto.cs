using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.Customers
{
    internal class PaymentScheduleItemDto
    {
        public DateTime PaymentDate { get; set; }
        public double PaymentAmount { get; set; }
        public double Balance { get; set; } 
        public double Interesr {  get; set; }
    }
}
