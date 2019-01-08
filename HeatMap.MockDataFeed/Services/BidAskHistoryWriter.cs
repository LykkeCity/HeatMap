using System.Threading.Tasks;
using HeatMap.Domains;

namespace HeatMap.MockDataFeed.Services
{
    public static class BidAskHistoryWriter
    {

        public static IBidAskHistoryRepository BidAskHistoryRepository;


        public static void Inject(IBidAskHistoryRepository bidAskHistoryRepository)
        {
            BidAskHistoryRepository = bidAskHistoryRepository;
        }


        public static async Task UpdateAsync(IBidAsk[] history)
        {
            
            
        }
        
        

    }
}