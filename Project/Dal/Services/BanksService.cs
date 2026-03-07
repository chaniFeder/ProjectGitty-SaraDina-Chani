using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    internal class BanksService : IBanks<Bank>
    {
        private dataManager dataManager;
        public BanksService(dataManager dataManager)
        {
            this.dataManager = dataManager;
        }
        public bool Create(Bank item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Bank item)
        {
            throw new NotImplementedException();
        }

        public List<Bank> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<Bank> Search(Func<Bank, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Bank item)
        {
            throw new NotImplementedException();
        }
    }
}
