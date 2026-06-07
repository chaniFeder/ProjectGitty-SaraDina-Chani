using Dal.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace server.Controllers.Advisor
{
    [ApiController]
    [Route("api/advisor/cases")]
    [Authorize(Roles = "advisor")]
    public class AdvisorCasesController : ControllerBase
    {
        private readonly IDal _dal;
        public AdvisorCasesController(IDal dal) => _dal = dal;

        private string GetAdvisorId() => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        [HttpGet]
        public IActionResult GetAll()
        {
            var advisorId = GetAdvisorId();
            var cases = _dal.Cases.Search(c => c.AdvisorId == advisorId);
            return Ok(cases);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateCaseRequest req)
        {
            var c = new Dal.Models.Case
            {
                AdvisorId = GetAdvisorId(),
                CaseType = req.CaseType,
                Status = req.Status ?? "Pending",
                BankId = req.BankId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };
            return _dal.Cases.Create(c) ? Ok() : BadRequest(new { message = "שגיאה ביצירת תיק" });
        }

        [HttpPut("{caseId}/status")]
        public IActionResult UpdateStatus(int caseId, [FromBody] UpdateStatusRequest req)
        {
            var c = _dal.Cases.Search(x => x.CaseId == caseId).FirstOrDefault();
            if (c == null) return NotFound();
            c.Status = req.Status;
            c.UpdatedAt = DateTime.UtcNow;
            return _dal.Cases.Update(c) ? NoContent() : BadRequest();
        }
    }

    public record CreateCaseRequest(string CaseType, string? Status, int? BankId);
    public record UpdateStatusRequest(string Status);
}
