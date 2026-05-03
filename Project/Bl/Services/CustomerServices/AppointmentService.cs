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

        List<AppointmentResponseDto> IAppointment.GetMyUpcomingAppointments(string customerId)
        {
            var appointments = dal?.Appointments?.Search(a =>
               a.CustomerId == customerId &&
               a.AppointmentDate >= DateTime.UtcNow
           ) ?? new List<Dal.Models.Appointment>();

            return appointments.Select(a => new AppointmentResponseDto
            {
                AppointmentId = a.AppointmentId,
                CustomerId = a.CustomerId,
                UserId = a.UserId,
                AppointmentDate = a.AppointmentDate,
                Duration = a.Duration,
                Status = a.Status,
                Notes = a.Notes,
                MeetingType = a.MeetingType,
                CreatedDate = a.CreatedDate
            }).ToList();
        }
        

        AppointmentResponseDto IAppointment.RequestAppointment(int customerId, AppointmentRequestDto request)
        {
            throw new NotImplementedException();
        }
    }
}

