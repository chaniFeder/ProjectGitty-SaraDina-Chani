using System;
using System.Collections.Generic;

namespace Dal.Api
{
    public interface IPayments<T>
    {
        bool Create(T item);
        List<T> GetAll();

        List<T> Search(Func<T, bool> predicate);

        bool Delete(T item);

        bool Update(T item);
    }
}
