using Bl.Api.IAdvisorServices;
using Bl.Models.MortgagAdvisor;
using Dal.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services.IAdvisorServices
{
    internal class MortgageService : IMortgage
    {

        private IDal dal { get; set; }
        public MortgageService(IDal dal)
        {
            this.dal = dal;
        }
        public void CalculateMortgageMix(string customerId, MortgageMixRequestDto request)
        {
            var mortgage = dal.Mortgages
                .Search(m => m.CustomerId == customerId)
                .FirstOrDefault();

            if (mortgage == null)
                throw new Exception("Mortgage not found");

            var program = dal.MortgagePrograms
                .Search(p => p.BankId == request.BankId && p.IsActive)
                .OrderBy(p => p.InterestRate)
                .FirstOrDefault();

            if (program == null)
                throw new Exception("No active mortgage program found");

            double monthlyRate = program.InterestRate / 100 / 12;
            int numberOfPayments = request.LoanTermYears * 12;

            double monthlyPayment;

            if (monthlyRate == 0)
            {
                monthlyPayment = request.LoanAmount / numberOfPayments;
            }
            else
            {
                monthlyPayment =
                    request.LoanAmount *
                    (monthlyRate * Math.Pow(1 + monthlyRate, numberOfPayments)) /
                    (Math.Pow(1 + monthlyRate, numberOfPayments) - 1);
            }

            mortgage.BankId = request.BankId;
            mortgage.LoanAmount = request.LoanAmount;
            mortgage.PropertyValue = request.PropertyValue;
            mortgage.DownPayment = request.DownPayment;
            mortgage.LoanTerm = request.LoanTermYears;
            mortgage.InterestRate = program.InterestRate;
            mortgage.MonthlyPayment = monthlyPayment;
            mortgage.LoanType = program.ProgramName;
            mortgage.LoanStatus = "Calculated";

            dal.Mortgages.Update(mortgage);
        }

        public List<MortgageProgramComparisonDto> CompareMortgagePrograms(
    double amount,
    int termYears)
        {
            var programs = dal.MortgagePrograms
                .Search(p => p.IsActive);

            var result = new List<MortgageProgramComparisonDto>();

            foreach (var program in programs)
            {
                double monthlyRate = program.InterestRate / 100 / 12;
                int payments = termYears * 12;

                double monthlyPayment;

                if (monthlyRate == 0)
                {
                    monthlyPayment = amount / payments;
                }
                else
                {
                    monthlyPayment =
                        amount *
                        (monthlyRate * Math.Pow(1 + monthlyRate, payments)) /
                        (Math.Pow(1 + monthlyRate, payments) - 1);
                }

                var bank = dal.Banks
                    .Search(b => b.BankId == program.BankId)
                    .FirstOrDefault();

                result.Add(new MortgageProgramComparisonDto
                {
                    BankId = program.BankId,
                    BankName = bank?.BankName ?? "Unknown",
                    ProgramName = program.ProgramName ?? "",
                    InterestRate = program.InterestRate,
                    MonthlyPayment = monthlyPayment,
                    TotalPayment = monthlyPayment * payments
                });
            }

            return result
                .OrderBy(r => r.TotalPayment)
                .ToList();
        }
    }
}
