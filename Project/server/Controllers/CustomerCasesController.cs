using Bl.Api.ICustomerServices;
using Bl.Services.CustomerServices;
using Dal.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace server.Controllers
{
    [ApiController]
    [Route("api/customer/cases")]
    [Authorize(Roles = "customer")]
    public class CustomerCasesController : ControllerBase
    {
        private readonly ICase _service;

        public CustomerCasesController(IDal dal)
        {
            _service = new CaseService(dal);
        }

        private string GetCustomerId() =>
            User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        // GET api/customer/cases
        [HttpGet]
        public IActionResult GetMyCases()
        {
            var cases = _service.GetMyCases(GetCustomerId());
            return Ok(cases);
        }
    }
}
