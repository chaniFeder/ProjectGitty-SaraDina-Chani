using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    public class MortgageService : IMortgages<Mortgage>
    {
        private dataManager dataManager;
        public MortgageService(dataManager dataManager)
        {
            this.dataManager = dataManager;
        }
        public bool Create(Mortgage item)
        {
            dataManager.Mortgages.Add(item);
            return dataManager.SaveChanges()>0;
        }

        public bool Delete(Mortgage item)
        {
            dataManager.Mortgages.Remove(item);
            return dataManager.SaveChanges() > 0;
        }

        public List<Mortgage> GetAll()
        {
            return dataManager.Mortgages.ToList();
        }

        public List<Mortgage> Search(Func<Mortgage, bool> predicate)
        {
            return dataManager.Mortgages.Where(predicate).ToList();
        }

        public bool Update(Mortgage item)
        {
            dataManager.Mortgages.Update(item);
            return dataManager.SaveChanges() > 0;
        }
    }
}
