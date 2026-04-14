using Bl.Api;
using Bl.Services;
using Dal.Api;

namespace Bl
{
    public class BlManager : IBl
    {
        private readonly IDal _dal;

        public BlManager(IDal dal)
        {
            _dal = dal;
            Users = new UsersService(_dal);
            Customers = new CustomersService(_dal);
            Cases = new CasesService(_dal);
            Mortgages = new MortgagesService(_dal);
            Payments = new PaymentsService(_dal);
            Appointments = new AppointmentsService(_dal);
            Banks = new BanksService(_dal);
            Documents = new DocumentsService(_dal);
            MortgagePrograms = new MortgageProgramsService(_dal);
        }

        public IUsers Users { get; }
        public ICustomers Customers { get; }
        public ICases Cases { get; }
        public IMortgages Mortgages { get; }
        public IPayments Payments { get; }
        public IAppointments Appointments { get; }
        public IBanks Banks { get; }
        public IDocuments Documents { get; }
        public IMortgagePrograms MortgagePrograms { get; }
    }
}
