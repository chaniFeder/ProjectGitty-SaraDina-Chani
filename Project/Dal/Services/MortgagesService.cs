using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    internal class MortgageService : IMortgages<Mortgage>
    {
        private dataManager dataManager;
        public MortgageService(dataManager dataManager)
        {
            this.dataManager = dataManager;
        }
        public bool Create(Mortgage item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Mortgage item)
        {
            throw new NotImplementedException();
        }

        public List<Mortgage> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<Mortgage> Search(Func<Mortgage, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Mortgage item)
        {
            throw new NotImplementedException();
        }
    }
}
