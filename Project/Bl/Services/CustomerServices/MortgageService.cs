using Bl.Api.ICustomerServices;
using Dal.Api;
using Dal.Models;

namespace Bl.Services.CustomerServices
{
    public class MortgageService : IMortgage
    {
        private IDal dal { get; set; }
        public MortgageService(IDal dal)
        {
            this.dal = dal;
        }

        Mortgage IMortgage.GetMortgageDetails(int mortgageId)
        {
            return dal.Mortgages.Search(m => m.MortgageId == mortgageId).FirstOrDefault();
        }
    }
}
