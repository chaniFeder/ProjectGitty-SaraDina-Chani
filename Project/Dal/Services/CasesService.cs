using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    public class CasesService : ICases<Case>
    {
        private dataManager dataManager;
        public CasesService(dataManager dataManager)
        {
            this.dataManager = dataManager;
        }
        public bool Create(Case item)
        {
            dataManager.Cases.Add(item);
            return dataManager.SaveChanges() > 0;
        }

        public bool Delete(Case item)
        {
            dataManager.Cases.Remove(item);
            return dataManager.SaveChanges() > 0;
        }

        public List<Case> GetAll()
        {
            return dataManager.Cases.ToList();
        }

        public List<Case> Search(Func<Case, bool> predicate)
        {
            return dataManager.Cases.Where(predicate).ToList();
        }

        public bool Update(Case item)
        {
            dataManager.Cases.Update(item);
            return dataManager.SaveChanges() > 0;
        }
    }
}