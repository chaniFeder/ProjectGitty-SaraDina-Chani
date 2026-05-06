using Bl.Api.IAdvisorServices;
using Bl.Models.MortgagAdvisor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services.IAdvisorServices
{
    internal class MortgageService : IMortgage
    {
        public void CalculateMortgageMix(int customerId, MortgageMixRequestDto request)
        {
            throw new NotImplementedException();
        }

        public void CompareMortgagePrograms(decimal amount, int term)
        {
            throw new NotImplementedException();
        }
    }
}
