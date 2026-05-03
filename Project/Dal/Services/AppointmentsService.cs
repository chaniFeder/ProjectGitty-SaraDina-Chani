using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    public class AppointmentService : IAppointments<Appointment>
    {
        private dataManager dataManager;
        public AppointmentService(dataManager dataManager)
        {
            this.dataManager = dataManager;
        }
        public bool Create(Appointment item)
        {
            dataManager.Appointments.Add(item);
            return dataManager.SaveChanges() > 0;
        }

        public bool Delete(Appointment item)
        {
            dataManager.Appointments.Remove(item);
            return dataManager.SaveChanges() > 0;
        }

        public List<Appointment> GetAll()
        {
            return dataManager.Appointments.ToList();
        }

        public List<Appointment> Search(Func<Appointment, bool> predicate)
        {
            return dataManager.Appointments.Where(predicate).ToList();
        }

        public bool Update(Appointment item)
        {
            dataManager.Appointments.Update(item);
            return dataManager.SaveChanges() > 0;
        }
    }
}
