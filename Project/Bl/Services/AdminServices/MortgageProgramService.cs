using Bl.Api.IAdminServices;
using Bl.Models.Admin;
using Dal.Api;
using Dal.Models;

namespace Bl.Services.AdminServices
{
    public class MortgageProgramService : IMortgageProgram
    {
        private IDal dal { get; set; }
        public MortgageProgramService(IDal dal)
        {
            this.dal = dal;
        }

        bool IMortgageProgram.AddMortgageProgram(MortgageProgramDto program)
        {
            var entity = new MortgageProgram
            {
                BankId = program.BankId,
                ProgramName = program.ProgramName,
                InterestRate = program.InterestRate,
                MaxLoanPercentage = program.MaxLoanPercentage,
                MinDownPayment = program.MinDownPayment,
                Description = program.Description,
                IsActive = true
            };
            return dal.MortgagePrograms.Create(entity);
        }

        bool IMortgageProgram.UpdateInterestRates(int programId, double newRate)
        {
            var entity = dal.MortgagePrograms.Search(p => p.ProgramId == programId).FirstOrDefault();
            if (entity == null) return false;

            entity.InterestRate = newRate;
            return dal.MortgagePrograms.Update(entity);
        }
    }
}
