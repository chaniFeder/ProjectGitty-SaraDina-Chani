using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models.Admin
{
    internal class UserDto
    {
        public string UserId { get; set; }
        public string Username { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }
    }
}
