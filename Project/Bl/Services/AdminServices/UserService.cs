using Bl.Api.IAdminServices;
using Bl.Models.Admin;
using Dal.Api;
using Dal.Models;

namespace Bl.Services.AdminServices
{
    public class UserService : IUser
    {
        private IDal dal { get; set; }
        public UserService(IDal dal)
        {
            this.dal = dal;
        }

        List<User> IUser.GetAllConsultants()
        {
            return dal.Users.Search(u => u.Role == "advisor");
        }

        bool IUser.AddNewConsultant(UserDto user)
        {
            var entity = new User
            {
                UserId = user.UserId,
                Username = user.Username,
                Password = user.Password,
                Role = "advisor"
            };
            return dal.Users.Create(entity);
        }
    }
}
