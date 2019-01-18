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

        bool Up { get; }
    }

    public interface IBidAskRepository
    {
        ValueTask<IEnumerable<IBidAsk>> GetAllAsync();
    }


    public static class BidAskHelpers
    {
        public static double GetMid(this IBidAsk bidAsk)
        {
            return (bidAsk.Bid + bidAsk.Ask) * 0.5;
        }
    }

}