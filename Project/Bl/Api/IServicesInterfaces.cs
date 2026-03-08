using Dal.Models;

namespace Bl.Services
{
    public interface ICasesService
    {
        bool Create(Case caseItem);
        List<Case> GetAll();
        Case? GetById(string caseId);
        bool Update(Case caseItem);
        bool Delete(string caseId);
    }

    public interface IMortgagesService
    {
        bool Create(Mortgage mortgage);
        List<Mortgage> GetAll();
        Mortgage? GetById(string mortgageId);
        bool Update(Mortgage mortgage);
        bool Delete(string mortgageId);
    }

    public interface IPaymentsService
    {
        bool Create(Payment payment);
        List<Payment> GetAll();
        Payment? GetById(string paymentId);
        bool Update(Payment payment);
        bool Delete(string paymentId);
    }

    public interface IAppointmentsService
    {
        bool Create(Appointment appointment);
        List<Appointment> GetAll();
        Appointment? GetById(string appointmentId);
        bool Update(Appointment appointment);
        bool Delete(string appointmentId);
    }

    public interface IBanksService
    {
        bool Create(Bank bank);
        List<Bank> GetAll();
        Bank? GetById(string bankId);
        bool Update(Bank bank);
        bool Delete(string bankId);
    }

    public interface IDocumentsService
    {
        bool Create(Document document);
        List<Document> GetAll();
        Document? GetById(string documentId);
        bool Update(Document document);
        bool Delete(string documentId);
    }

    public interface IMortgageProgramsService
    {
        bool Create(MortgageProgram program);
        List<MortgageProgram> GetAll();
        MortgageProgram? GetById(string programId);
        bool Update(MortgageProgram program);
        bool Delete(string programId);
    }
}
