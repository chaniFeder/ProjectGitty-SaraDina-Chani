using Bl.Api.ICustomerServices;
using Bl.Models.Customers;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services.IAdvisorServices
{
    internal class AppointmentsService : IAppointment

    {
        public List<AppointmentResponseDto> GetMyUpcomingAppointments(int customerId)
        {
            throw new NotImplementedException();
        }

        public List<AppointmentResponseDto> GetMyUpcomingAppointments(string customerId)
        {
            throw new NotImplementedException();
        }

        public AppointmentResponseDto RequestAppointment(int customerId, AppointmentRequestDto request)
        {
            throw new NotImplementedException();
        }

        public AppointmentResponseDto RequestAppointment(string customerId, AppointmentRequestDto request)
        {
            throw new NotImplementedException();
        }
    }
}