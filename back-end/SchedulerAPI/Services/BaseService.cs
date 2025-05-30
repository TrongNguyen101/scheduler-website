using SchedulerAPI.Core;
using SchedulerAPI.Model;
using System.Linq.Expressions;

namespace SchedulerAPI.Services
{
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity : class
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IAsyncRepository<TEntity> _repository;

        public BaseService(IHttpContextAccessor contextAccessor)
        {
            _httpContextAccessor = contextAccessor;
        }
        protected T GetService<T>()
        {
            return (T)_httpContextAccessor.HttpContext?.RequestServices.GetService(typeof(T));
        }

        public virtual async Task<TEntity> CreateAsync(TEntity entity)
        {
            await CreateAsync(new List<TEntity>() { entity });
            return entity;
        }

        public virtual async Task<IEnumerable<TEntity>> CreateAsync(IEnumerable<TEntity> entities)
        {
            if (!entities.Any())
                return entities;

            await _repository.InsertAsync(entities, autoSave: false);

            //await CreateChangeLogForCreate();

            await _repository.DbContext.SaveChangesAsync();

            return entities;
        }

        public IQueryable<TEntity> SearchQuery(Expression<Func<TEntity, bool>> domain = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null, int offSet = 0, int limit = 0,
    bool isPagingEnabled = false)
        {
            ISpecification<TEntity> spec = new InitialSpecification<TEntity>(x => true);
            if (domain != null)
                spec = new InitialSpecification<TEntity>(domain);

            return _repository.SearchQuery(domain: spec.AsExpression(), orderBy: orderBy, offSet: offSet, limit: limit, isPagingEnabled: isPagingEnabled);

        }
    }
}
