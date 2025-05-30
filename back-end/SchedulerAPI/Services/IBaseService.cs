using System.Linq.Expressions;

namespace SchedulerAPI.Services
{
    public interface IBaseService<T> where T : class
    {
        //Task<T> GetByIdAsync(object id);
        //T Create(T entity);
        //Task<T> CreateAsync(T entity);
        //Task<IEnumerable<T>> CreateAsync(IEnumerable<T> entities);
        //Task UpdateAsync(T entity);
        //Task UpdateAsync(IEnumerable<T> entities);
        //void Delete(T entity);
        //Task DeleteAsync(T entity);
        //Task DeleteAsync(IEnumerable<T> entities);

        public IQueryable<T> SearchQuery(Expression<Func<T, bool>> domain = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, int offSet = 0, int limit = int.MaxValue,
    bool isPagingEnabled = false);
    }
}
