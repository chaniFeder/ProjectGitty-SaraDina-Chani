using Bl.Api.ICustomerServices;
using Bl.Services.CustomerServices;
using Dal.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace server.Controllers
{
    [ApiController]
    [Route("api/customer/mortgages")]
    [Authorize(Roles = "customer")]
    public class CustomerMortgageController : ControllerBase
    {
        private readonly IMortgage _mortgageService;
        private readonly IPayment _paymentService;
        private readonly IDal _dal;

        public CustomerMortgageController(IDal dal)
        {
            _dal = dal;
            _mortgageService = new MortgageService(dal);
            _paymentService = new PaymentService(dal);
        }

        private string GetCustomerId() =>
            User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        // GET api/customer/mortgages
        // Returns all mortgages belonging to the authenticated customer
        [HttpGet]
        public IActionResult GetMyMortgages()
        {
            var mortgages = _dal.Mortgages.Search(m => m.CustomerId == GetCustomerId());
            return Ok(mortgages);
        }

        // GET api/customer/mortgages/{id}
        [HttpGet("{id:int}")]
        public IActionResult GetMortgageDetails(int id)
        {
            var mortgage = _mortgageService.GetMortgageDetails(id);
            if (mortgage == null) return NotFound();

            // Security: ensure the mortgage belongs to the caller
            if (mortgage.CustomerId != GetCustomerId())
                return Forbid();

            return Ok(mortgage);
        }

        // GET api/customer/mortgages/{id}/payments
        [HttpGet("{id:int}/payments")]
        public IActionResult GetPaymentSchedule(int id)
        {
            // Verify ownership
            var mortgage = _mortgageService.GetMortgageDetails(id);
            if (mortgage == null) return NotFound();
            if (mortgage.CustomerId != GetCustomerId()) return Forbid();

            var schedule = _paymentService.GetMyPaymentSchedule(id.ToString());
            return Ok(schedule);
        }
    }
}
