using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    public class MortgageProgramsService : IMortgagePrograms<MortgageProgram>
    {
        private dataManager dataManager;
        public MortgageProgramsService(dataManager dataManager)
        {
            this.dataManager = dataManager;
        }
        public bool Create(MortgageProgram item)
        {
            dataManager.MortgagePrograms.Add(item);
            return dataManager.SaveChanges() > 0;
        }

        public bool Delete(MortgageProgram item)
        {
            dataManager.MortgagePrograms.Remove(item);
            return dataManager.SaveChanges() > 0;
        }

        public List<MortgageProgram> GetAll()
        {
            return dataManager.MortgagePrograms.ToList();
        }

        public List<MortgageProgram> Search(Func<MortgageProgram, bool> predicate)
        {
            return dataManager.MortgagePrograms.Where(predicate).ToList();
        }

        public bool Update(MortgageProgram item)
        {
            dataManager.MortgagePrograms.Update(item);
            return dataManager.SaveChanges() > 0;
        }
    }
}
