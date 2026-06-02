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

        private IDal dal { get; set; }
        public DocumentsService(IDal dal)
        {
            this.dal = dal;
        }
        public List<Document> GetMyDocuments(string customerId)
        {
            return dal.Documents.Search(d => d.CustomerId == customerId);
        }

        public bool UploadDocument(int customerId, DocumentUploadDto document)
        {
            throw new NotImplementedException();
        }
    }
}
