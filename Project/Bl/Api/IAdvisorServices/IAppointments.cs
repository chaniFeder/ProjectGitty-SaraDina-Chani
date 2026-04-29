using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.IAdvisorServices
{
    internal interface IAppointments
    {
      List <Appointment>  GetMyDailySchedule(int userId, DateTime date);

      Appointment ScheduleAppointment(AppointmentDto appointment);
    }
}
