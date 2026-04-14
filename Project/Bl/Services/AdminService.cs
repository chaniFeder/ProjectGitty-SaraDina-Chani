using Bl.Api;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    internal class AdminService : IAdminApi
    {
        public bool EditCase(int caseId, CaseEditDetails details)
        {
            throw new NotImplementedException();
        }

        public IEnumerable FilterCases(FilterCriteria criteria)
        {
            throw new NotImplementedException();
        }

        public string GetSystemStatistics()
        {
            throw new NotImplementedException();
        }

        public bool Login(string username, string password)
        {
            throw new NotImplementedException();
        }
    }
}
