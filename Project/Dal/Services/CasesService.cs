using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    internal class CasesService : ICases<Case>
    {
        private dataManager dataManager;
        public CasesService(dataManager dataManager)
        {
            this.dataManager = dataManager;
        }
        public bool Create(Case item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Case item)
        {
            throw new NotImplementedException();
        }

        public List<Case> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<Case> Search(Func<Case, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Case item)
        {
            throw new NotImplementedException();
        }
    }
}
