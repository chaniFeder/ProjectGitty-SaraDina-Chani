using Bl.Api.ICustomerServices;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services.CustomerServices
{
    public class CaseService : ICase
    {
        private IDal dal { get; set; }
        public CaseService(IDal dal)
        {
            this.dal = dal;
        }
        public List<Case> GetMyCases(string customerId)
        {
            return dal?.Cases?.Search(c => c.CustomerId == customerId) ?? new List<Case>();
        }
    }
}
