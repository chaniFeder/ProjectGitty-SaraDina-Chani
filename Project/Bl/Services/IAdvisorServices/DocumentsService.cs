using Bl.Api.ICustomerServices;
using Bl.Models.Customers;
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
        public List<Document> GetMyDocuments(int customerId)
        {
            throw new NotImplementedException();
        }

        public bool UploadDocument(int customerId, DocumentUploadDto document)
        {
            throw new NotImplementedException();
        }
    }
}
