using Bl.Api.ICustomerServices;
using Bl.Models.Customers;
using Bl.Services.CustomerServices;
using Dal.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace server.Controllers
{
    [ApiController]
    [Route("api/customer/appointments")]
    [Authorize(Roles = "customer")]
    public class CustomerAppointmentsController : ControllerBase
    {
        private readonly IAppointment _service;

        public CustomerAppointmentsController(IDal dal)
        {
            _service = new AppointmentService(dal);
        }

        private string GetCustomerId() =>
            User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        // GET api/customer/appointments
        [HttpGet]
        public IActionResult GetUpcomingAppointments()
        {
            var appointments = _service.GetMyUpcomingAppointments(GetCustomerId());
            return Ok(appointments);
        }

        // POST api/customer/appointments
        [HttpPost]
        public IActionResult RequestAppointment([FromBody] AppointmentRequestDto request)
        {
            request.CustomerId = GetCustomerId();

            var result = _service.RequestAppointment(GetCustomerId(), request);
            return Ok(result);
        }
    }
}
