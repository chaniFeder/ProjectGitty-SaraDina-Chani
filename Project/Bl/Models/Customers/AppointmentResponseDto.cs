using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.Customers
{
    internal class AppointmentResponseDto
    {
        public int AppointmentId { get; set; }
        public string CustomerId { get; set; }

        public string UserId { get; set; }

        public DateTime AppointmentDate { get; set; }

        public int Duration { get; set; }

        public string Status { get; set; } 

        public string? Notes { get; set; }

        public string MeetingType { get; set; } 
        public DateTime? CreatedDate { get; set; }
    }
}
