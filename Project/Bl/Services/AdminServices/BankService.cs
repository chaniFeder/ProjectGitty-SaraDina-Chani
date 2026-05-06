using Bl.Api.IAdminServices;
using Bl.Models.Admin;
using Dal.Api;
using Dal.Models;

namespace Bl.Services.AdminServices
{
    public class BankService : IBank
    {
        private IDal dal { get; set; }
        public BankService(IDal dal)
        {
            this.dal = dal;
        }

        bool IBank.AddNewBank(BankDto bank)
        {
            var entity = new Bank
            {
                BankCode = bank.BankCode,
                BankName = bank.BankName,
                ContactPerson = bank.ContactPerson ?? string.Empty,
                PhoneNumber = bank.PhoneNumber,
                Email = bank.Email ?? string.Empty,
                IsActive = bank.IsActive ?? true,
                MinLoanAmount = bank.MinLoanAmount ?? 0,
                MaxLoanAmount = bank.MaxLoanAmount ?? 0
            };
            return dal.Banks.Create(entity);
        }

        bool IBank.UpdateBankDetails(BankDto bank)
        {
            var entity = dal.Banks.Search(b => b.BankCode == bank.BankCode).FirstOrDefault();
            if (entity == null) return false;

            entity.ContactPerson = bank.ContactPerson ?? entity.ContactPerson;
            entity.PhoneNumber = bank.PhoneNumber ?? entity.PhoneNumber;
            entity.Email = bank.Email ?? entity.Email;
            entity.IsActive = bank.IsActive ?? entity.IsActive;
            entity.MinLoanAmount = bank.MinLoanAmount ?? entity.MinLoanAmount;
            entity.MaxLoanAmount = bank.MaxLoanAmount ?? entity.MaxLoanAmount;

            return dal.Banks.Update(entity);
        }
    }
}
