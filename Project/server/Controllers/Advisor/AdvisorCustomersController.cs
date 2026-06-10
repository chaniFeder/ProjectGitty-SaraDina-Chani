using Bl.Models.MortgagAdvisor;
using Dal.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers.Advisor
{
    [ApiController]
    [Route("api/advisor/customers")]
    [Authorize(Roles = "advisor")]
    public class AdvisorCustomersController : ControllerBase
    {
        private readonly IDal _dal;
        public AdvisorCustomersController(IDal dal) => _dal = dal;

        [HttpGet]
        public IActionResult GetAll() => Ok(_dal.Customers.GetAll());

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var c = _dal.Customers.Search(x => x.CustomerId == id).FirstOrDefault();
            return c == null ? NotFound() : Ok(c);
        }

        [HttpPost]
        public IActionResult Register([FromBody] NewCustomerDto dto)
        {
            var customer = new Dal.Models.Customer
            {
                CustomerId = dto.CustomerId,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                Address = dto.Address,
                DateOfBirth = dto.DateOfBirth,
                MonthlyIncome = dto.MonthlyIncome,
            };
            return _dal.Customers.Create(customer) ? Ok() : BadRequest(new { message = "לא ניתן לרשום לקוח" });
        }
    }
}
