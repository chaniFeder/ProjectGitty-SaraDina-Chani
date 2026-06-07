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
    [Route("api/customer/documents")]
    [Authorize(Roles = "customer")]
    public class CustomerDocumentsController : ControllerBase
    {
        private readonly IDocument _service;

        public CustomerDocumentsController(IDal dal)
        {
            _service = new DocumentService(dal);
        }

        private string GetCustomerId() =>
            User.FindFirstValue(ClaimTypes.NameIdentifier)!;

        // GET api/customer/documents
        [HttpGet]
        public IActionResult GetMyDocuments()
        {
            if (!int.TryParse(GetCustomerId(), out var id))
                return BadRequest();

            var docs = _service.GetMyDocuments(id);
            return Ok(docs);
        }

        // POST api/customer/documents
        // Accepts multipart/form-data: file + documentType + documentName
        [HttpPost]
        public async Task<IActionResult> UploadDocument(
            IFormFile file,
            [FromForm] string documentName,
            [FromForm] string? documentType)
        {
            if (!int.TryParse(GetCustomerId(), out var id))
                return BadRequest();

            if (file == null || file.Length == 0)
                return BadRequest(new { message = "לא נבחר קובץ" });

            using var ms = new MemoryStream();
            await file.CopyToAsync(ms);

            var dto = new DocumentUploadDto
            {
                CustomerId = GetCustomerId(),
                DocumentName = documentName,
                DocumentType = documentType,
                FileContent = ms.ToArray(),
                FileExtension = Path.GetExtension(file.FileName)
            };

            var result = _service.UploadDocument(id, dto);
            if (!result)
                return StatusCode(500, new { message = "שגיאה בהעלאת המסמך" });

            return Ok(new { message = "המסמך הועלה בהצלחה" });
        }
    }
}
