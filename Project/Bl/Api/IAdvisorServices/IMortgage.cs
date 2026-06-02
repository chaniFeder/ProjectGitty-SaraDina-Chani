using Bl.Models.MortgagAdvisor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.IAdvisorServices
{
    internal interface IMortgage
    {
        public void CalculateMortgageMix(string customerId, MortgageMixRequestDto request);

        public List<MortgageProgramComparisonDto> CompareMortgagePrograms(double amount,int termYears);
    }
}
