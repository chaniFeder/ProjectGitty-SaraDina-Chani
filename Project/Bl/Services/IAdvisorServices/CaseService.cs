using Bl.Api.IAdvisorServices;
using Bl.Models.MortgagAdvisor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services.IAdvisorServices
{
    internal class CaseService : ICase
    {
        public bool CreateNewCase(int customerId, CaseDto newCase)
        {
            throw new NotImplementedException();
        }

        public bool UpdateCaseStatus(int caseId, string newStatus)
        {
            throw new NotImplementedException();
        }
    }
}
