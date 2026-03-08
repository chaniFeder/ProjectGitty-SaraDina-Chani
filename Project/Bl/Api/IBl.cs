using Bl.Api;

namespace Bl.Api
{
    public interface IBl
    {
        IUsers Users { get; }
        ICustomers Customers { get; }
        ICases Cases { get; }
        IMortgages Mortgages { get; }
        IPayments Payments { get; }
        IAppointments Appointments { get; }
        IBanks Banks { get; }
        IDocuments Documents { get; }
        IMortgagePrograms MortgagePrograms { get; }
    }
}

