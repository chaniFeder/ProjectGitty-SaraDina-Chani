using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    internal class AppointmentService : IAppointments<Appointment>
    {
        public bool Create(Appointment item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Appointment item)
        {
            throw new NotImplementedException();
        }

        public List<Appointment> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<Appointment> Search(Func<Appointment, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Appointment item)
        {
            throw new NotImplementedException();
        }
    }
}
