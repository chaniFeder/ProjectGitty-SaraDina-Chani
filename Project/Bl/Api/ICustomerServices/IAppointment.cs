using Bl.Models.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.ICustomerServices
{
    public interface IAppointment
    {
        AppointmentResponseDto RequestAppointment(string customerId, AppointmentRequestDto request);
        List<AppointmentResponseDto> GetMyUpcomingAppointments(string customerId);
    }
}
