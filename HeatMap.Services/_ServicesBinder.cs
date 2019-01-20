using Common;
using HeatMap.Domains;
using MyNoSqlServerClient;

namespace HeatMap.Services
{

    public interface IServicesSettings
    {
        string CacheUrl { get; }
    }
    
    
    public static class ServicesBinder
    {

        public static TimerExecutor TimerExecutor;
        
        public static void BindHeatMapServices(this IDependencyCollection dc, IServicesSettings settings)
        {
            var bidAskRepository = new BidAskRepository(new MyNoSqlServerClient<BidAskMySqlTableEntity>(settings.CacheUrl, "bidask"));
            dc.AddSingleton<IBidAskRepository, BidAskRepository>(bidAskRepository);
            
            
            var bidAskHistoryRepository = new BidAskHistoryRepository(new MyNoSqlServerClient<BidAskHistoryTableEntity>(settings.CacheUrl, "bidaskhistory"));
            dc.AddSingleton<IBidAskHistoryRepository, BidAskHistoryRepository>(bidAskHistoryRepository);
            
            
            var bidAskCache = new BidAskCache(bidAskRepository);
            dc.AddSingleton<IBidAskCache, BidAskCache>(bidAskCache);
            
            
            var indexInfoRepo = new IndexInformationRepository(new MyNoSqlServerClient<IndexInformationTableEntity>(settings.CacheUrl, "indexinfo"));
            dc.AddSingleton<IIndexInformationRepository, IndexInformationRepository>(indexInfoRepo);
            
            TimerExecutor = new TimerExecutor(1000)
                .RegisterTimer(nameof(bidAskCache), bidAskCache);
            
            TimerExecutor.Start();
            
            
            
        }
        
    }
}