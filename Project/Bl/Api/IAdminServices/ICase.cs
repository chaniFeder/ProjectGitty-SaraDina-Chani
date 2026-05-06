using Bl.Models.Admin;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.IAdminServices
{
    internal interface ICase
    {
        SystemStatisticsDto SystemStatistics();
        List<Case> GetAllActiveCases();
    }
}
