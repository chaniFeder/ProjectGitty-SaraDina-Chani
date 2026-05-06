using Bl.Api.IAdminServices;
using Bl.Models.Admin;
using Dal.Api;
using Dal.Models;

namespace Bl.Services.AdminServices
{
    public class CaseService : ICase
    {
        private IDal dal { get; set; }
        public CaseService(IDal dal)
        {
            this.dal = dal;
        }

        Case ICase.GetAllActiveCases()
        {
            return dal.Cases.Search(c => c.Status == "Active").FirstOrDefault();
        }

        SystemStatisticsDto ICase.SystemStatistics()
        {
            var allCases = dal.Cases.GetAll();
            var activeCases = allCases.Where(c => c.Status == "Active").ToList();
            var closedCases = allCases.Where(c => c.Status == "Closed").ToList();

            var activeMortgages = dal.Mortgages.Search(m => m.LoanStatus == "Active");
            var expectedRevenue = activeMortgages.Sum(m => (decimal)(m.MonthlyPayment * m.LoanTerm));

            return new SystemStatisticsDto
            {
                ActiveCases = activeCases.Count,
                ExpectedRevenue = expectedRevenue,
                ClosureRate = allCases.Count == 0 ? 0 : (double)closedCases.Count / allCases.Count * 100
            };
        }
    }
}
