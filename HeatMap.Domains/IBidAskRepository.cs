using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HeatMap.Domains
{

    public interface IBidAsk
    {
        string Id { get; }
        DateTime DateTime { get; }
        double Bid { get; }
        double Ask { get; }
    }
    
    public interface IBidAskRepository
    {
        Task<IEnumerable<IBidAsk>> GetAllAsync();
    }
    
}