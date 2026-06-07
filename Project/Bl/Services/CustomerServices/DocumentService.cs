using Bl.Api.ICustomerServices;
using Bl.Models.Customers;
using Dal.Api;
using Dal.Models;

namespace Bl.Services.CustomerServices
{
    public class DocumentService : IDocument
    {
        private static readonly string BasePath =
            Environment.GetEnvironmentVariable("DOCUMENTS_PATH")
            ?? Path.Combine(AppContext.BaseDirectory, "DocumentsUpload");

        private IDal dal { get; set; }
        public DocumentService(IDal dal)
        {
            this.dal = dal;
        }

        bool IDocument.UploadDocument(int customerId, DocumentUploadDto document)
        {
            var customer = dal.Customers.Search(c => c.CustomerId == customerId.ToString()).FirstOrDefault();
            if (customer == null) return false;

            var documentType = document.DocumentType ?? "General";
            var folderPath = Path.Combine(BasePath, documentType);
            Directory.CreateDirectory(folderPath);

            var fileName = $"{customer.FirstName}_{customer.LastName}{document.FileExtension}";
            var filePath = Path.Combine(folderPath, fileName);
            File.WriteAllBytes(filePath, document.FileContent);

            var entity = new Document
            {
                CustomerId = customerId.ToString(),
                DocumentType = documentType,
                DocumentName = document.DocumentName,
                FilePath = filePath
            };
            return dal.Documents.Create(entity);
        }

        List<Document> IDocument.GetMyDocuments(int customerId)
        {
            return dal.Documents.Search(d => d.CustomerId == customerId.ToString());
        }
    }
}
