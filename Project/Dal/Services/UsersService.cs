using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    internal class UsersService : IUsers<User>
    {
        private dataManager dataManager;
        public UsersService(dataManager dataManager)
        {
            this.dataManager = dataManager;
        }

        public bool Create(User item)
        {
            dataManager.Users.Add(item);
            return dataManager.SaveChanges() > 0;
        }

        public bool Delete(User item)
        {
            dataManager.Users.Remove(item);
            return dataManager.SaveChanges() > 0;
        }

        public List<User> GetAll()
        {
            return dataManager.Users.ToList();
        }

        public List<User> Search(Func<User, bool> predicate)
        {
            return dataManager.Users.Where(predicate).ToList();
        }

        public bool Update(User item)
        {   
            dataManager.Users.Update(item);
            return dataManager.SaveChanges() > 0;
        }
    }
}
