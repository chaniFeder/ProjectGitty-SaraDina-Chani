using Bl.Models.Admin;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.IAdminServices
{
    internal interface IUser
    {
        List<User> GetAllConsultants();
        bool AddNewConsultant(UserDto user);
    }
}
