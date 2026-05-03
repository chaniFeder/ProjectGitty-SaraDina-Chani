using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    public class PaymentsService : IPayments<Payment>
    {
        private dataManager dataManager;
        public PaymentsService(dataManager dataManager)
        {
            this.dataManager = dataManager;
        }
        public bool Create(Payment item)
        {
            dataManager.Payments.Add(item);
            return dataManager.SaveChanges() > 0;
        }

        public bool Delete(Payment item)
        {
            dataManager.Payments.Remove(item);
            return dataManager.SaveChanges() > 0;
        }

        public List<Payment> GetAll()
        {
            return dataManager.Payments.ToList();
        }

        public List<Payment> Search(Func<Payment, bool> predicate)
        {
            return dataManager.Payments.Where(predicate).ToList();
        }

        public bool Update(Payment item)
        {
            dataManager.Payments.Update(item);
            return dataManager.SaveChanges() > 0;
        }
    }
}
