using System.Linq.Expressions;

namespace SchedulerAPI.Core
{
    public abstract class CompositeSpecification<T> : ISpecification<T>
    {
        public Expression<Func<T, bool>> Criteria { get; protected set; }
        public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();
        public List<string> IncludeStrings { get; } = new List<string>();
        public Expression<Func<T, object>> OrderBy { get; protected set; }
        public Expression<Func<T, object>> OrderByDescending { get; protected set; }
        public Expression<Func<T, object>> GroupBy { get; protected set; }

        public int Take { get; protected set; }
        public int Skip { get; protected set; }
        public bool isPagingEnabled { get; protected set; } = false;

        public abstract Expression<Func<T, bool>> AsExpression();
        public abstract bool IsSatisfiedBy(T candidate);
     
    }

}
