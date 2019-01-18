using System.Collections.Generic;

namespace HeatMap.Domains
{
    public interface IBidAskCache
    {
        IEnumerable<IBidAsk> GetProfile();

    }
}