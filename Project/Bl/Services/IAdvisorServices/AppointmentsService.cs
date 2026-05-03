using Bl.Api.IAdvisorServices;
using Bl.Api.ICustomerServices;
using Bl.Models.Customers;
using Bl.Models.MortgagAdvisor;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using System.ComponentModel.Design;

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
           return dal.Appointments.Search(a => a.UserId == userId && a.AppointmentDate.Date == date.Date);

        }

        public Appointment ScheduleAppointment(AppointmentDto appointment, int userid)
        {
            if (dal.Appointments.Search(appointment => appointment.date && Userid = appointment.userid)
                {
                return "there is An Appointment on this time";
            }
            else {
                Appointment newAppointment = new Appointment
                {
                    CustomerId = cusomerid,
                    UserId = userid,
                    AppointmentDate = appointmentdate,
                    Duration = duratoin,
                    MeetingType = meetingtype
                };
                dal.Appointments.Update(newAppointment);
            }

        }
    }
}