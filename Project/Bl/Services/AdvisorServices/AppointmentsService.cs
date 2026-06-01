using Bl.Api.ICustomerServices;
using Bl.Models.Customers;
using Bl.Models.MortgagAdvisor;
using Dal.Api;
using Dal.Models;
using Dal.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services.IAdvisorServices
{
   public class AppointmentsService : IAppointment

    {
        private readonly IDataManager dataManager;
        private IDal dal { get; set; }
        public AppointmentsService(IDal dal)
        {
            this.dal = dal;
            this.dataManager = dataManager;
        }


        public List<AppointmentDto> GetMyUpcomingAppointments(string customerId)
        {
            var upcomingAppointments = dataManager.Appointments.Where(appointment => appointment.CustomerId == customerId && appointment.AppointmentDate > DateTime.Now).ToList();

            // המרה ל- AppointmentDto
            var responseDtos = upcomingAppointments.Select(appointment => new AppointmentDto
            {
                CustomerId = appointment.CustomerId,
                UserId = appointment.UserId,
                AppointmentDate = appointment.AppointmentDate,
                Duration = appointment.Duration,
                Status = appointment.Status,
                Notes = appointment.Notes,
                MeetingType = appointment.MeetingType
            }).ToList();

            return responseDtos;
        }

        public AppointmentResponseDto RequestAppointment(string customerId, AppointmentRequestDto request)
        {
            // יצירת אובייקט Appointment חדש
            var newAppointment = new Appointment
            {
                CustomerId = customerId,
                UserId = request.UserId,
                AppointmentDate = request.AppointmentDate,
                Duration = request.Duration,
                Status = "Requested",
                Notes = request.Notes,
                MeetingType = request.MeetingType,
                CreatedDate = DateTime.Now
            };

            // שמירת ההזמנה
            dataManager.Appointments.Add(newAppointment);
            dataManager.SaveChanges();

            // החזרת התגובה
            return new AppointmentResponseDto
            {
                AppointmentId = newAppointment.AppointmentId,
                CustomerId = newAppointment.CustomerId,
                UserId = newAppointment.UserId,
                AppointmentDate = newAppointment.AppointmentDate,
                Duration = newAppointment.Duration,
                Status = newAppointment.Status,
                Notes = newAppointment.Notes,
                MeetingType = newAppointment.MeetingType,
                CreatedDate = newAppointment.CreatedDate
            };
        }
    }
}