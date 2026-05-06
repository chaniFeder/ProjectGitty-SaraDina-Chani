using Bl.Api.ICustomerServices;
using Dal.Api;
using Dal.Models;

namespace Bl.Services.CustomerServices
{
    public class CaseService : ICase
    {
        private IDal dal { get; set; }
        public CaseService(IDal dal)
        {
            this.dal = dal;
        }

        List<Case> ICase.GetMyCases(string customerId)
        {
            return dal.Cases.Search(c => c.CustomerId == customerId);
        }
    }
}
