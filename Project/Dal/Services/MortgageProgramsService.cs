using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    internal class MortgageProgramsService : IMortgagePrograms<MortgageProgram>
    {
        private dataManager dataManager;
        public MortgageProgramsService(dataManager dataManager)
        {
            this.dataManager = dataManager;
        }
        public bool Create(MortgageProgram item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(MortgageProgram item)
        {
            throw new NotImplementedException();
        }

        public List<MortgageProgram> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<MortgageProgram> Search(Func<MortgageProgram, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(MortgageProgram item)
        {
            throw new NotImplementedException();
        }
    }
}
