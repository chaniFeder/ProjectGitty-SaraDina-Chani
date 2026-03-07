using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    internal class DocumentsService : IDocuments<Document>
    {
        private dataManager dataManager;
        public DocumentsService(dataManager dataManager)
        {
            this.dataManager = dataManager;
        }
        public bool Create(Document item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(Document item)
        {
            throw new NotImplementedException();
        }

        public List<Document> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<Document> Search(Func<Document, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public bool Update(Document item)
        {
            throw new NotImplementedException();
        }
    }
}
