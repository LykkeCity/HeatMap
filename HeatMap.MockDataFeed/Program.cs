using System;
using System.Threading;
using HeatMap.MockDataFeed.Services;
using HeatMap.Services;
using MyNoSqlServerClient;

namespace HeatMap.MockDataFeed
{
    class Program
    {
        static void Main(string[] args)
        {

            var settings = SettingsModel.Create();

            BidAskReader.Inject(settings.BidAskUrl);

            var table = new MyNoSqlServerClient<BidAskMySqlTableEntity>(settings.CacheUrl, "bidask");
            var bidAskRepository = new BidAskRepository(table);
            
            var tableBidAskHistory = new MyNoSqlServerClient<BidAskHistoryTableEntity>(settings.CacheUrl, "bidAskHistory");
            var bidAskHistoryRepository = new BidAskHistoryRepository(tableBidAskHistory);
            
            BidAskWriter.Inject(bidAskRepository);
            BidAskHistoryWriter.Inject(bidAskHistoryRepository);


            table.GetAsync("test", "test").Wait();

            while (true)
            {
                try
                {
                    var bidAsk =  BidAskReader.RequestDataAsync().Result;
                    BidAskWriter.UpdateAsync(bidAsk).Wait();
                    BidAskHistoryWriter.UpdateAsync(bidAsk).Wait();
                }
                catch (Exception e)
                {
                    Console.WriteLine("Exception:" + e);
                }
                finally
                {
                    Thread.Sleep(5000);
                }
            }

        }

    }
}