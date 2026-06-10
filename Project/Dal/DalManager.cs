using Dal.Api;
using Dal.Models;
using Dal.Services;

namespace Dal
{
    public class DalManager : IDal
    {
        public AppointmentService Appointments { get; }
        public BanksService Banks { get; }
        public CasesService Cases { get; }
        public CustomersService Customers { get; }
        public DocumentsService Documents { get; }
        public MortgageProgramsService MortgagePrograms { get; }
        public MortgageService Mortgages { get; }
        public PaymentsService Payments { get; }
        public UsersService Users { get; }

        public DalManager(dataManager db)
        {
            Appointments = new AppointmentService(db);
            Banks = new BanksService(db);
            Cases = new CasesService(db);
            Customers = new CustomersService(db);
            Documents = new DocumentsService(db);
            MortgagePrograms = new MortgageProgramsService(db);
            Mortgages = new MortgageService(db);
            Payments = new PaymentsService(db);
            Users = new UsersService(db);
        }
    }
}
