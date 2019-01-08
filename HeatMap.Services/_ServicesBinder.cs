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
        public static void BindHeatMapServices(this IDependencyCollection dc, IServicesSettings settings)
        {
            var bidAskRepository = new BidAskRepository(new MyNoSqlServerClient<BidAskMySqlTableEntity>(settings.CacheUrl, "bidask"));
            dc.AddSingleton<IBidAskRepository, BidAskRepository>(bidAskRepository);
            
            
            var bidAskHistoryRepository = new BidAskHistoryRepository(new MyNoSqlServerClient<BidAskHistoryTableEntity>(settings.CacheUrl, "bidaskhistory"));
            dc.AddSingleton<IBidAskHistoryRepository, BidAskHistoryRepository>(bidAskHistoryRepository);
        }
        
    }
}