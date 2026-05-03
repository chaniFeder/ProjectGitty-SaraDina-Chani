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
            if (request is null) throw new ArgumentNullException(nameof(request));
            if (dal?.Appointments == null) throw new InvalidOperationException("DAL appointments service is not available.");

            var entity = new Dal.Models.Appointment
            {
                CustomerId = customerId.ToString(),
                UserId = request.UserId,
                AppointmentDate = request.AppointmentDate,
                Duration = request.Duration,
                Status = request.Status,
                Notes = request.Notes,
                MeetingType = request.MeetingType,
                CreatedDate = DateTime.UtcNow
            };

            var created = dal.Appointments.Create(entity);
            if (!created) throw new InvalidOperationException("Failed to create appointment in DAL.");

            return new AppointmentResponseDto
            {
                AppointmentId = entity.AppointmentId,
                CustomerId = entity.CustomerId,
                UserId = entity.UserId,
                AppointmentDate = entity.AppointmentDate,
                Duration = entity.Duration,
                Status = entity.Status,
                Notes = entity.Notes,
                MeetingType = entity.MeetingType,
                CreatedDate = entity.CreatedDate
            };

        }
    }

