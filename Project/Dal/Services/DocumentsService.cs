using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Api;
using Dal.Models;

namespace Dal.Services
{
    public class DocumentsService : IDocuments<Document>
    {
        private dataManager dataManager;
        public DocumentsService(dataManager dataManager)
        {
            this.dataManager = dataManager;
        }
        public bool Create(Document item)
        {
            dataManager.Documents.Add(item);
            return dataManager.SaveChanges() > 0;
        }

        public bool Delete(Document item)
        {
            dataManager.Documents.Remove(item);
            return dataManager.SaveChanges() > 0;
        }

        public List<Document> GetAll()
        {
            return dataManager.Documents.ToList();
        }

        public List<Document> Search(Func<Document, bool> predicate)
        {
            return dataManager.Documents.Where(predicate).ToList();
        }

        public bool Update(Document item)
        {
            dataManager.Documents.Update(item);
            return dataManager.SaveChanges() > 0;
        }
    }
}
