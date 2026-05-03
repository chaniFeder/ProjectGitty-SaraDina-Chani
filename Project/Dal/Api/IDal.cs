using Dal.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IDal
    {
        AppointmentService Appointments { get; }
        BanksService Banks { get; }
        CasesService Cases { get; }
        CustomersService Customers { get; }
        DocumentsService Documents { get; }
        MortgageProgramsService MortgagePrograms { get; }
        MortgageService Mortgages { get; }
        PaymentsService Payments { get; }
        UsersService Users { get; }
    }
}
