using System;
using System.Threading.Tasks;
using Common;
using HeatMap.Domains;
using HeatMap.Services;

namespace HeatMap.MockDataFeed.Services
{
    public static class BidAskHistoryWriter
    {

        public class BidAskHistory : IBidAskHistory
        {
            public string Id { get; private set; }
            public double[] History { get; private set; }

            public static BidAskHistory CreateDefault(string id)
            {
                return Create(id, Array.Empty<double>());
            }
            
            public static BidAskHistory Create(string id, double[] history)
            {
                return new BidAskHistory
                {
                    Id = id,
                    History = history
                };
            }
        }
        
        public static BidAskHistoryRepository BidAskHistoryRepository { get; private set; }

        public static void Inject(BidAskHistoryRepository bidAskHistoryRepository)
        {
            BidAskHistoryRepository = bidAskHistoryRepository;
        }
        
        private static DateTime _lastUpdate = DateTime.UtcNow.AddYears(-1);

        private static bool HadUpdateSameMinute(this DateTime now)
        {
            return _lastUpdate.Year == now.Year &&
                   _lastUpdate.Month == now.Month &&
                   _lastUpdate.Day == now.Day &&
                   _lastUpdate.Hour == now.Hour &&
                   _lastUpdate.Minute == now.Minute;
        }

        public static async Task UpdateAsync(IBidAsk[] items)
        {

            var now = DateTime.UtcNow;
            if (now.HadUpdateSameMinute())
                return;
            _lastUpdate = now;
            
            foreach (var bidAsk in items)
            {
                var entity = await BidAskHistoryRepository.GetAsync(bidAsk.Id) ?? BidAskHistory.CreateDefault(bidAsk.Id);
                
                
                entity = BidAskHistory.Create(entity.Id, entity.History.Add(bidAsk.GetMid(), 60));

                await BidAskHistoryRepository.UpdateAsync(entity);
            }
            
            Console.WriteLine($"{DateTime.UtcNow}: Updated BidAskHistory. Count:"+items.Length);
        }

    }
    
}