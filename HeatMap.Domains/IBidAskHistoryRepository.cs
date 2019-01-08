using System.Threading.Tasks;

namespace HeatMap.Domains
{

    public interface IBidAskHistory
    {
        string Id { get; }
        double[] History { get; }
    }
    
    public interface IBidAskHistoryRepository
    {
        Task<IBidAskHistory> GetAsync(string id);
    }
    
}