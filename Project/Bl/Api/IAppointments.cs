using Dal.Models;

namespace Bl.Api
{
    public interface IAppointments
    {
        bool Create(Appointment item);
        List<Appointment> GetAll();
        List<Appointment> Search(Func<Appointment, bool> predicate);
        bool Delete(Appointment item);
        bool Update(Appointment item);
    }
}
