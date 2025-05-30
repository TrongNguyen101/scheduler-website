using Microsoft.EntityFrameworkCore;
using SchedulerAPI.DataContext;
using System.Linq.Expressions;

namespace SchedulerAPI.Core
{
    public class EfRepository<T> : IAsyncRepository<T> where T : class
    {
        protected SchedulerContext _dbContext;

        public IDbContext DbContext => _dbContext;

        public EfRepository(SchedulerContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<T> SearchQuery(Expression<Func<T, bool>> domain = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, int offSet = 0, int limit = int.MaxValue,
       bool isPagingEnabled = false)
        {
            var query = _dbContext.Set<T>().AsQueryable();
            if (domain != null)
                query = query.Where(domain);

            if (orderBy != null)
                query = orderBy(query);

            if (limit > 0)
                query = query.Skip(offSet).Take(limit);

            return query;
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }

        public virtual async Task<T> GetByIdAsync(object id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public async Task<T> InsertAsync(T entity)
        {
            await InsertAsync(new List<T>() { entity });
            return entity;
        }

        public virtual async Task<IEnumerable<T>> InsertAsync(IEnumerable<T> entities, bool autoSave = true)
        {
            await _dbContext.Set<T>().AddRangeAsync(entities);
            if (autoSave)
                await _dbContext.SaveChangesAsync();

            //foreach (var entity in entities)
            //    TriggerEntityCreateEvents(entity);

            return entities;
        }


        public async Task UpdateAsync(IEnumerable<T> entities, bool autoSave = true)
        {
            if (entities == null)
                return;

            foreach (var entity in entities)
            {
                _dbContext.Entry(entity).State = EntityState.Modified;
            }

            if (autoSave)
            {
                try
                {
                    await _dbContext.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    Console.WriteLine(ex);
                    throw ex;
                }
            }
        }

        public async Task DeleteAsync(IEnumerable<T> entities, bool autoSave = true)
        {
            _dbContext.Set<T>().RemoveRange(entities);

            if (autoSave)
                await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(T entity)
        {
            await DeleteAsync(new List<T>() { entity });
        }

        public Task<IEnumerable<T>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(T entity)
        {
            throw new NotImplementedException();
        }

    }
}
