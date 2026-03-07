using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    internal class PaymentsService : IPayments<Payment>
    {
        private dataManager dataManager;
        public PaymentsService(dataManager dataManager)
        {
            this.dataManager = dataManager;
        }
        public bool Create(Payment item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Payment item)
        {
            throw new NotImplementedException();
        }

        public List<Payment> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<Payment> Search(Func<Payment, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Payment item)
        {
            throw new NotImplementedException();
        }
    }
}
