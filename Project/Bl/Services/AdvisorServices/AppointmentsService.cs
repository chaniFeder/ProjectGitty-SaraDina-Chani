using Bl.Api.ICustomerServices;
using Bl.Models.Customers;
using Dal.Api;
using Dal.Models;

namespace Bl.Services.IAdvisorServices
{
    public class AppointmentsService : IAppointment
    {
        private readonly IDal _dal;

        public AppointmentsService(IDal dal)
        {
            _dal = dal;
        }

        public List<AppointmentResponseDto> GetMyUpcomingAppointments(string customerId)
        {
            return _dal.Appointments
                .Search(a => a.CustomerId == customerId && a.AppointmentDate > DateTime.UtcNow)
                .Select(a => new AppointmentResponseDto
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

        public AppointmentResponseDto RequestAppointment(string customerId, AppointmentRequestDto request)
        {
            var entity = new Appointment
            {
                CustomerId = customerId,
                UserId = request.UserId,
                AppointmentDate = request.AppointmentDate,
                Duration = request.Duration,
                Status = "Requested",
                Notes = request.Notes,
                MeetingType = request.MeetingType,
                CreatedDate = DateTime.UtcNow
            };

            _dal.Appointments.Create(entity);

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
}
