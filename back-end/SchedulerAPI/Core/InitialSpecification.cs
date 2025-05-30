using System.Linq.Expressions;

namespace SchedulerAPI.Core
{
    public class InitialSpecification<T> : BaseSpecification<T>
    {
        public InitialSpecification(Expression<Func<T, bool>> criteria) : base(criteria)
        {
        }
    }
}
