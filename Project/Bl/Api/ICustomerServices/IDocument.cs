using Bl.Models.Customers;
using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api.ICustomerServices
{
    public interface IDocument
    {
        bool UploadDocument(string customerId, DocumentUploadDto document);
        List<Document> GetMyDocuments(string customerId);
    }
}
