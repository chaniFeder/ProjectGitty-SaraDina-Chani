using Dal.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers.Advisor
{
    [ApiController]
    [Route("api/advisor/documents")]
    [Authorize(Roles = "advisor")]
    public class AdvisorDocumentsController : ControllerBase
    {
        private readonly IDal _dal;
        public AdvisorDocumentsController(IDal dal) => _dal = dal;

        [HttpGet("{customerId}")]
        public IActionResult GetByCustomer(string customerId)
        {
            var docs = _dal.Documents.Search(d => d.CustomerId == customerId);
            return Ok(docs);
        }

        [HttpPut("{documentId}/verify")]
        public IActionResult Verify(int documentId, [FromBody] VerifyRequest req)
        {
            var doc = _dal.Documents.Search(d => d.DocumentId == documentId).FirstOrDefault();
            if (doc == null) return NotFound();
            doc.IsVerified = req.IsVerified;
            return _dal.Documents.Update(doc) ? NoContent() : BadRequest();
        }
    }

    public record VerifyRequest(bool IsVerified);
}
