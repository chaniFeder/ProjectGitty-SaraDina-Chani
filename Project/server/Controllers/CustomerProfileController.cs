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
    [Route("api/customer/profile")]
    [Authorize(Roles = "customer")]
    public class CustomerProfileController : ControllerBase
    {
        private readonly ICustomer _service;

        public CustomerProfileController(IDal dal)
        {
            _service = new CustomerService(dal);
        }

        private string GetCustomerId() =>
            User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        // GET api/customer/profile
        [HttpGet]
        public IActionResult GetProfile()
        {
            if (!int.TryParse(GetCustomerId(), out var id))
                return BadRequest();

            var profile = _service.GetMyProfile(id);
            if (profile == null) return NotFound();
            return Ok(profile);
        }

        // PUT api/customer/profile/contact
        [HttpPut("contact")]
        public IActionResult UpdateContact([FromBody] ContactInfoDto dto)
        {
            if (!int.TryParse(GetCustomerId(), out var id))
                return BadRequest();

            _service.UpdateMyContactInfo(id, dto);
            return NoContent();
        }
    }
}
