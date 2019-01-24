using System;
using System.Collections.Generic;
using System.Linq;
using HeatMap.Domains;

namespace HeatMap.Web.Models
{

    public class OvershootResponseContract
    {
        public OvershootContract Index { get; set; }
        
        
        public OvershootContract[] Parts { get; set; }


        public static OvershootResponseContract CreateMock(IEnumerable<IIndexAssetInfo> indexAssetInfo, Func<string, double[]> getHistory)
        {
            const string lcy = "LCI";
            return new OvershootResponseContract
            {
                Index = OvershootContract.CreateMockLyCi(lcy, 8, 1, getHistory(lcy)),
                Parts = indexAssetInfo.OrderByDescending(itm => itm.Weight)
                    .Select(info => OvershootContract.CreateMockLyCi(
                        info.AssetId,  
                        8, 
                        info.Weight, 
                        getHistory(info.AssetId))).ToArray()
            };
        }
    }
    
    public class OvershootContract
    {
        public string AssetId { get; set; }
        
        public int Accuracy { get; set; }
        
        public double Weight { get; set; }
        
        public double[] History { get; set; }
        public OvershootThresholdContract[] Thresholds { get; set; }

        public static OvershootContract CreateMockLyCi(string assetId, int accuracy, double weight, double[] history)
        {
            return new OvershootContract
            {
                AssetId = assetId,
                Thresholds = OvershootThresholdContract.FillMockData(),
                Accuracy = accuracy,
                History = history,
                Weight = weight
            };
        }
        
    }


    public class OvershootThresholdContract
    {
        public double Percent { get; set; }
        public double Delta { get; set; }
        public string Direction { get; set; }

        public static OvershootThresholdContract Create(double percent, double delta, string direction)
        {
            return new OvershootThresholdContract
            {
                Percent = percent,
                Delta = delta,
                Direction = direction

            };
        }

        public static OvershootThresholdContract[] FillMockData()
        {
            return new []
            {
                Create(0.1, 0.1, "up"),
                Create(0.2, 0.4, "up"),
                Create(0.3, 0.6, "down"),
                Create(0.4, 0.8, "up"),
                Create(0.5, 1.0, "up")
            };
        }
    }
}