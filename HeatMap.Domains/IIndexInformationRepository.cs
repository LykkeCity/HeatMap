using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HeatMap.Domains
{

    public interface IIndexAssetInfo
    {
        string AssetId { get; }
        double Weight { get; }
        double Price { get; }
        bool IsDisabled { get; }
    }

    public interface IIndexInformation
    {
        string Source { get; }
        string AssetPair { get; }
        double Bid { get; }
        double Ask { get; }
         DateTime Timestamp { get; }
         IEnumerable<IIndexAssetInfo> AssetsInfo { get; }
    }
    
    public interface IIndexInformationRepository
    {
        ValueTask UpdateAsync(IIndexInformation data);


        Task<IIndexInformation> GetAsync(string id);
    }
}