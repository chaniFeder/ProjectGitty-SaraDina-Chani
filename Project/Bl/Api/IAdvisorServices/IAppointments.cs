using Bl.Models.MortgagAdvisor;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.IAdvisorServices
{
    public interface IAppointments
    {
      List <Appointment>  GetMyDailySchedule(string userId, DateTime date);

      Appointment ScheduleAppointment(AppointmentDto appointment,int Userid);
    }
}
