using Bl.Api.ICustomerServices;
using Bl.Models.Customers;
using Dal.Api;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services.IAdvisorServices
{
    internal class DocumentsService : IDocument
    {
        public List<Document> GetMyDocuments(string customerId)
        {
            return dal.Documents.Search(d => d.CustomerId == customerId);
        }

        public bool UploadDocument(string customerId, DocumentUploadDto document)
        {
            string fileName = $"{Guid.NewGuid()}{document.FileExtension}";
            string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            string filePath = Path.Combine(uploadsFolder, fileName);

            File.WriteAllBytes(filePath, document.FileContent);

            Document newDocument = new Document
            {
                CustomerId = document.CustomerId,
                DocumentType = document.DocumentType,
                DocumentName = document.DocumentName,
                FilePath = filePath,
                IsVerified = false
            };

            return dal.Documents.Create(newDocument);
        }
    }
}
