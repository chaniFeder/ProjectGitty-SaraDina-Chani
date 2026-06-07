using Bl.Models.Customers;
using Dal.Api;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IDal _dal;
        private readonly JwtService _jwt;

        public AuthController(IDal dal, JwtService jwt)
        {
            _dal = dal;
            _jwt = jwt;
        }

        // POST api/auth/login
        // Body: { "username": "...", "password": "..." }
        // Returns: { token, userId, username, role }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = _dal.Users
                .Search(u => u.Username == request.Username && u.Password == request.Password)
                .FirstOrDefault();

            if (user == null)
                return Unauthorized(new { message = "שם משתמש או סיסמה שגויים" });

            var token = _jwt.GenerateToken(user.UserId, user.Username, user.Role);
            return Ok(new { token, userId = user.UserId, username = user.Username, role = user.Role });
        }

        // POST api/auth/register
        // Registers a new customer (creates both Customer + User records)
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            var existing = _dal.Users.Search(u => u.UserId == request.CustomerId).FirstOrDefault();
            if (existing != null)
                return Conflict(new { message = "משתמש עם תעודת זהות זו כבר קיים" });

            var customer = new Customer
            {
                CustomerId = request.CustomerId,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                DateOfBirth = request.DateOfBirth,
                MonthlyIncome = request.MonthlyIncome,
                CreatedDate = DateTime.UtcNow
            };

            var user = new User
            {
                UserId = request.CustomerId,
                Username = request.Username,
                Password = request.Password,
                Role = "customer"
            };

            var customerCreated = _dal.Customers.Create(customer);
            var userCreated = _dal.Users.Create(user);

            if (!customerCreated || !userCreated)
                return StatusCode(500, new { message = "שגיאה ביצירת המשתמש" });

            var token = _jwt.GenerateToken(user.UserId, user.Username, user.Role);
            return Ok(new { token, userId = user.UserId, username = user.Username, role = user.Role });
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
    }

    public class RegisterRequest
    {
        public string CustomerId { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Address { get; set; } = null!;
        public DateOnly? DateOfBirth { get; set; }
        public double? MonthlyIncome { get; set; }
    }
}
