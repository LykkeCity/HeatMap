using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Common
{
    public static class LinqAsync
    {

        public static async Task<T[]> ToArrayAsync<T>(this Task<IEnumerable<T>> srcTask)
        {
            var result = await srcTask;
            return result.ToArray();
        }
        
        public static async ValueTask<T[]> ToArrayAsync<T>(this ValueTask<IEnumerable<T>> srcTask)
        {
            var result = await srcTask;
            return result.ToArray();
        }
        
        
    }
}