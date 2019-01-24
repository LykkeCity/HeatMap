using System;
using System.Collections.Generic;
using HeatMap.Domains;

namespace HeatMap.DataJob.IndexInfoFeed
{

    public class IndexAssetInfoContract : IIndexAssetInfo
    {
        public string AssetId { get; set; }
        public double Weight { get; set; }
        public double Price { get; set; }
        public bool IsDisabled { get; set; }
    }
    public class IndexInformationContract : IIndexInformation
    {
        public string Source { get; set; }
        public string AssetPair { get; set; }
        public double Bid { get; set; }
        public double Ask { get; set; }
        public DateTime Timestamp { get; set; }
        
        public IndexAssetInfoContract[] AssetsInfo { get; set; }
        IEnumerable<IIndexAssetInfo> IIndexInformation.AssetsInfo => AssetsInfo;
    }
    
    
    /////////////////////////////////////////////////////////////////////////////

    
    public class OvershootIndicatorRabbitMqContract : IOvershootIndicatorData
    {
        public string AssetPair { get; set; }
        public double Delta { get; set; }
        public double Overshot { get; set; }
    }

    public class OvershootIndicatorsRabbitMqContract 
    {
        public OvershootIndicatorRabbitMqContract[] Indicators { get; set; }
    }
}