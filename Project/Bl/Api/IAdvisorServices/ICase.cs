using Bl.Models.MortgagAdvisor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.IAdvisorServices
{
    internal interface ICase
    {
     bool   CreateNewCase(int customerId, CaseDto newCase);

        bool UpdateCaseStatus(int caseId, string newStatus);


    }
}
