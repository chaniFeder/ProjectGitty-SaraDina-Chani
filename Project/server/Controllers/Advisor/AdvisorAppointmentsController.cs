using Dal.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace server.Controllers.Advisor
{
    [ApiController]
    [Route("api/advisor/appointments")]
    [Authorize(Roles = "advisor")]
    public class AdvisorAppointmentsController : ControllerBase
    {
        private readonly IDal _dal;
        public AdvisorAppointmentsController(IDal dal) => _dal = dal;

        private string GetAdvisorId() => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        [HttpGet]
        public IActionResult GetAll()
        {
            var advisorId = GetAdvisorId();
            var appts = _dal.Appointments.Search(a => a.UserId == advisorId);
            return Ok(appts);
        }

        [HttpPut("{id}/status")]
        public IActionResult UpdateStatus(int id, [FromBody] UpdateApptStatusRequest req)
        {
            var a = _dal.Appointments.Search(x => x.AppointmentId == id).FirstOrDefault();
            if (a == null) return NotFound();
            a.Status = req.Status;
            return _dal.Appointments.Update(a) ? NoContent() : BadRequest();
        }
    }

    public record UpdateApptStatusRequest(string Status);
}
