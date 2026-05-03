using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IMortgagePrograms<T>
    {
        bool Create(T item);
        List<T> GetAll();

        List<T> Search(Func<bool, T> func);

        bool Delete(T item);

        bool Update(T item);
    }
}
