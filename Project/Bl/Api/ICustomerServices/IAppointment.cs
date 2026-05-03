using Bl.Models.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.ICustomerServices
{
    internal interface IAppointment
    {
        AppointmentResponseDto RequestAppointment(int customerId, AppointmentRequestDto request);
        List<AppointmentResponseDto> GetMyUpcomingAppointments(int customerId);
    }
}
