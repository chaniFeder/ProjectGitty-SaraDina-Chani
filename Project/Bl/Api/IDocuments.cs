using Dal.Models;

namespace Bl.Api
{
    public interface IDocuments
    {
        bool Create(Document item);
        List<Document> GetAll();
        List<Document> Search(Func<Document, bool> predicate);
        bool Delete(Document item);
        bool Update(Document item);
    }
}
