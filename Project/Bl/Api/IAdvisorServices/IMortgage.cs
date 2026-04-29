using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.IAdvisorServices
{
    internal interface IMortgage
    {
      void  CalculateMortgageMix(int customerId, MortgageMixRequestDto request);

      void CompareMortgagePrograms(decimal amount, int term)
    }
}
