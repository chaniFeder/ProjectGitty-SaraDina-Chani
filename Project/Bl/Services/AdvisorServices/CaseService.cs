using Bl.Api.IAdvisorServices;
using Bl.Models.MortgagAdvisor;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services.IAdvisorServices
{
    public class CaseService : ICase
    {
        private IDal dal { get; set; }
        public CaseService(IDal dal)
        {
            this.dal = dal;
        }
        public bool CreateNewCase(int customerId, CaseDto newCaseDto)
        {
            var newCase = new Case
            {
                AdvisorId = newCaseDto.AdvisorId,
                CaseType = newCaseDto.CaseType,
                Status = newCaseDto.Status,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            return dal.Cases.Create(newCase);
        }

        public bool UpdateCaseStatus(int caseId, string newStatus)
        {
            var existingCase = dal.Cases
                .Search(c => c.CaseId == caseId)
                .FirstOrDefault();

            if (existingCase == null)
                return false;

            existingCase.Status = newStatus;
            existingCase.UpdatedAt = DateTime.Now;

            return dal.Cases.Update(existingCase);
        }
    }
}
