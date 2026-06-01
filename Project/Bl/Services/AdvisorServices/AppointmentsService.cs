using Bl.Api.IAdvisorServices;
using Bl.Models.Customers;
using Bl.Models.MortgagAdvisor;
using Dal.Api;
using Dal.Models;

namespace Bl.Services.IAdvisorServices
{
    public class AppointmentsService : IAppointments
    {
        private IDal dal { get; set; }

        public AppointmentsService(IDal dal)
        {
            this.dal = dal;
        }

        public List<Appointment> GetMyDailySchedule(string userId, DateTime date)
        {
            if (dal?.Appointments == null)
                throw new InvalidOperationException("DAL appointments service is not available.");

            return dal.Appointments.Search(a =>
                a.UserId == userId &&
                a.AppointmentDate.Date == date.Date
            ) ?? new List<Appointment>();
        }

        public Appointment ScheduleAppointment(AppointmentDto appointment, int userId)
        {
            if (appointment == null)
                throw new ArgumentNullException(nameof(appointment));

            if (dal?.Appointments == null)
                throw new InvalidOperationException("DAL appointments service is not available.");

            // בדיקה אם כבר יש פגישה באותו זמן
            var existingAppointment = dal.Appointments.Search(a =>
                a.UserId == userId &&
                a.AppointmentDate == appointment.AppointmentDate
            );

            if (existingAppointment != null && existingAppointment.Any())
            {
                throw new InvalidOperationException(
                    "There is already an appointment at this time."
                );
            }

            var newAppointment = new Appointment
            {
                CustomerId = appointment.CustomerId,
                UserId = userId.ToString(),
                AppointmentDate = appointment.AppointmentDate,
                Duration = appointment.Duration,
                MeetingType = appointment.MeetingType,
                Status = "Scheduled",
                CreatedDate = DateTime.UtcNow
            };

            var created = dal.Appointments.Create(newAppointment);

            if (!created)
            {
                throw new InvalidOperationException(
                    "Failed to create appointment."
                );
            }

            return newAppointment;
        }
    }
}