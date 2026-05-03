using Bl.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.IAdminServices
{
    internal interface IMortgageProgram
    {
        bool AddMortgageProgram(MortgageProgramDto program);
        bool UpdateInterestRates(int programId, double newRate);
    }
}
