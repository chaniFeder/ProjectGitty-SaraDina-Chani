using Bl.Api.ICustomerServices;
using Bl.Models.Customers;
using Dal.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services.CustomerServices
{
    public class AppointmentService : IAppointment
    {
        public IDal dal { get; set; }
        public AppointmentService(IDal dal) { 
            this.dal = dal;
        }

        List<AppointmentResponseDto> IAppointment.GetMyUpcomingAppointments(int customerId)
        {
            
        }

        AppointmentResponseDto IAppointment.RequestAppointment(int customerId, AppointmentRequestDto request)
        {
            throw new NotImplementedException();
        }
    }
}
