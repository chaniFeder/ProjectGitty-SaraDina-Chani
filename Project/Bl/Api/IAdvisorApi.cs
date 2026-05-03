using Bl.Models.MortgagAdvisor;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    internal interface IAdvisorApi
    {
        IEnumerable GetCustomerCases(int advisorId);
        MortgageCaseDto ReviewCase(int caseId);
    }
}
