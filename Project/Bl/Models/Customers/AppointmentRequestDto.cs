using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.Customers
{
    internal class AppointmentRequestDto
    {
        public string CustomerId { get; set; }

        public string UserId { get; set; } 

        public DateTime AppointmentDate { get; set; }

        public int Duration { get; set; }

        public string Status { get; set; }

        public string? Notes { get; set; }

        public string MeetingType { get; set; }
    }
}
