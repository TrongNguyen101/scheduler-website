using System.Linq.Expressions;

namespace SchedulerAPI.Core
{
    public interface IAsyncRepository<T> where T : class
    {
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T> InsertAsync(T entity);
        Task<IEnumerable<T>> InsertAsync(IEnumerable<T> entities, bool autoSave = true);
        Task<T> GetByIdAsync(object id);
        Task UpdateAsync(T entity);
        Task UpdateAsync(IEnumerable<T> entities, bool autoSave = true);

        Task DeleteAsync(T entity);

        Task DeleteAsync(IEnumerable<T> entities, bool autoSave = true);

        IQueryable<T> SearchQuery(Expression<Func<T, bool>> domain = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, int offSet = 0, int limit = int.MaxValue,
    bool isPagingEnabled = false);

        IDbContext DbContext { get; }
    }
}
