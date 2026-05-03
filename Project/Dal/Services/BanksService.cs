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
            dataManager.Banks.Add(item);
            return dataManager.SaveChanges() > 0;
        }

        public bool Delete(Bank item)
        {
            dataManager.Banks.Remove(item);
            return dataManager.SaveChanges() > 0;
        }

        public List<Bank> GetAll()
        {
            return dataManager.Banks.ToList();
        }

        public List<Bank> Search(Func<Bank, bool> predicate)
        {
            return dataManager.Banks.Where(predicate).ToList();
        }

        public bool Update(Bank item)
        {
            dataManager.Banks.Update(item);
            return dataManager.SaveChanges() > 0;
        }
    }
}
