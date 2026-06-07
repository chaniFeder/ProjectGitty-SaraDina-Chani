using Dal.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [ApiController]
    [Route("api/advisors")]
    [Authorize]
    public class AdvisorsController : ControllerBase
    {
        private readonly IDal _dal;

        public AdvisorsController(IDal dal)
        {
            _dal = dal;
        }

        // GET api/advisors
        // Returns list of all active advisors (for appointment booking dropdown)
        [HttpGet]
        public IActionResult GetAdvisors()
        {
            var advisors = _dal.Users
                .Search(u => u.Role == "advisor")
                .Select(u => new { u.UserId, u.Username })
                .ToList();

            return Ok(advisors);
        }
    }
}
