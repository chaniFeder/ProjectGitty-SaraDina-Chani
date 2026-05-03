using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface ICrud<T>
    {
        bool Create(T item);
        List<T> GetAll();

        List<T> Search(Func<T, bool> predicate);

        bool Delete(T item);

        bool Update(T item);
    }
}
