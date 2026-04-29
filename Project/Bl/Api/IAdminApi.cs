using Bl.Models.Admin;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    internal interface IAdminApi
    {
        bool Login(string username, string password);
        string GetSystemStatistics();
        IEnumerable FilterCases(FilterCriteria criteria);
        bool EditCase(int caseId, CaseEditDetails details);
    }
}
