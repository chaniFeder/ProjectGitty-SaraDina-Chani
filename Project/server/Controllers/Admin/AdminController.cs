using Bl.Models.Admin;
using Dal.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers.Admin
{
    [ApiController]
    [Authorize(Roles = "admin")]
    public class AdminController : ControllerBase
    {
        private readonly IDal _dal;
        public AdminController(IDal dal) => _dal = dal;

        [HttpGet("api/admin/statistics")]
        public IActionResult GetStatistics()
        {
            var cases = _dal.Cases.GetAll();
            var active = cases.Count(c => c.Status == "Active");
            var closed = cases.Count(c => c.Status == "Closed" || c.Status == "Completed");
            var total = cases.Count;
            var mortgages = _dal.Mortgages.GetAll();
            var revenue = mortgages.Sum(m => m.MonthlyPayment);

            return Ok(new
            {
                activeCases = active,
                expectedRevenue = revenue,
                closureRate = total > 0 ? Math.Round((double)closed / total * 100, 1) : 0.0,
            });
        }

        [HttpGet("api/admin/cases")]
        public IActionResult GetActiveCases()
        {
            var cases = _dal.Cases.Search(c => c.Status == "Active");
            return Ok(cases);
        }

        [HttpGet("api/admin/banks")]
        public IActionResult GetBanks() => Ok(_dal.Banks.GetAll());

        [HttpPost("api/admin/banks")]
        public IActionResult AddBank([FromBody] BankDto dto)
        {
            var bank = new Dal.Models.Bank
            {
                BankCode = dto.BankCode,
                BankName = dto.BankName,
                ContactPerson = dto.ContactPerson ?? string.Empty,
                PhoneNumber = dto.PhoneNumber,
                Email = dto.Email ?? string.Empty,
                IsActive = dto.IsActive ?? true,
                MinLoanAmount = dto.MinLoanAmount ?? 0,
                MaxLoanAmount = dto.MaxLoanAmount ?? 0,
            };
            return _dal.Banks.Create(bank) ? Ok() : BadRequest(new { message = "שגיאה בהוספת בנק" });
        }

        [HttpPut("api/admin/banks/{id}")]
        public IActionResult UpdateBank(int id, [FromBody] BankDto dto)
        {
            var bank = _dal.Banks.Search(b => b.BankId == id).FirstOrDefault();
            if (bank == null) return NotFound();
            bank.BankName = dto.BankName;
            bank.ContactPerson = dto.ContactPerson ?? bank.ContactPerson;
            bank.PhoneNumber = dto.PhoneNumber ?? bank.PhoneNumber;
            bank.Email = dto.Email ?? bank.Email;
            bank.IsActive = dto.IsActive ?? bank.IsActive;
            bank.MinLoanAmount = dto.MinLoanAmount ?? bank.MinLoanAmount;
            bank.MaxLoanAmount = dto.MaxLoanAmount ?? bank.MaxLoanAmount;
            return _dal.Banks.Update(bank) ? NoContent() : BadRequest();
        }

        [HttpGet("api/admin/programs")]
        public IActionResult GetPrograms() => Ok(_dal.MortgagePrograms.GetAll());

        [HttpPost("api/admin/programs")]
        public IActionResult AddProgram([FromBody] MortgageProgramDto dto)
        {
            var p = new Dal.Models.MortgageProgram
            {
                BankId = dto.BankId,
                ProgramName = dto.ProgramName,
                InterestRate = dto.InterestRate,
                MaxLoanPercentage = dto.MaxLoanPercentage,
                MinDownPayment = dto.MinDownPayment,
                Description = dto.Description,
                IsActive = true,
            };
            return _dal.MortgagePrograms.Create(p) ? Ok() : BadRequest(new { message = "שגיאה בהוספת תוכנית" });
        }

        [HttpPut("api/admin/programs/{id}/rate")]
        public IActionResult UpdateRate(int id, [FromBody] UpdateRateRequest req)
        {
            var p = _dal.MortgagePrograms.Search(x => x.ProgramId == id).FirstOrDefault();
            if (p == null) return NotFound();
            p.InterestRate = req.InterestRate;
            return _dal.MortgagePrograms.Update(p) ? NoContent() : BadRequest();
        }

        [HttpGet("api/admin/users")]
        public IActionResult GetAdvisors()
        {
            var users = _dal.Users.Search(u => u.Role == "advisor");
            return Ok(users);
        }

        [HttpPost("api/admin/users")]
        public IActionResult AddAdvisor([FromBody] UserDto dto)
        {
            var user = new Dal.Models.User
            {
                UserId = dto.UserId ?? Guid.NewGuid().ToString()[..9],
                Username = dto.Username,
                Password = dto.Password,
                Role = "advisor",
            };
            return _dal.Users.Create(user) ? Ok() : BadRequest(new { message = "שגיאה בהוספת יועץ" });
        }
    }

    public record UpdateRateRequest(double InterestRate);
}
