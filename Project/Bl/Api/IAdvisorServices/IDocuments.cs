using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Bl.Models.Customers;

namespace Bl.Api.IAdvisorServices
{
    internal interface IDocuments
    {
        public bool VerifyDocument(int documentId, bool isVerified);

        public List<Document> GetMyDocuments(string customerId);

        public bool UploadDocument(DocumentUploadDto document);
    }
}
