using Bl.Api;
using Bl.Services.AdminServices;
using Bl.Services.CustomerServices;
using Dal.Api;

namespace Bl
{
    public class BlManager : IBl
    {
        public readonly CustomerService CustomerSvc;
        public readonly AppointmentService AppointmentSvc;
        public readonly Bl.Services.CustomerServices.CaseService CaseSvc;
        public readonly MortgageService MortgageSvc;
        public readonly PaymentService PaymentSvc;
        public readonly DocumentService DocumentSvc;
        public readonly BankService BankSvc;
        public readonly MortgageProgramService MortgageProgramSvc;
        public readonly UserService UserSvc;

        public BlManager(IDal dal)
        {
            CustomerSvc = new CustomerService(dal);
            AppointmentSvc = new AppointmentService(dal);
            CaseSvc = new Bl.Services.CustomerServices.CaseService(dal);
            MortgageSvc = new MortgageService(dal);
            PaymentSvc = new PaymentService(dal);
            DocumentSvc = new DocumentService(dal);
            BankSvc = new BankService(dal);
            MortgageProgramSvc = new MortgageProgramService(dal);
            UserSvc = new UserService(dal);
        }
    }
}
