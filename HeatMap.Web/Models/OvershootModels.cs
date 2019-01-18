using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace HeatMap.Web.Models
{

    public class OvershootResponseContract
    {
        public OvershootContract Index { get; set; }
        
        
        public OvershootContract[] Parts { get; set; }


        public static OvershootResponseContract CreateMock()
        {
            return new OvershootResponseContract
            {
                Index = OvershootContract.CreateMockLyCi(),
                Parts = new[]
                {
                    OvershootContract.CreateMockLyCi(),
                    OvershootContract.CreateMockLyCi(),
                    OvershootContract.CreateMockLyCi(),
                    OvershootContract.CreateMockLyCi(),
                    OvershootContract.CreateMockLyCi(),
                    OvershootContract.CreateMockLyCi(),
                    OvershootContract.CreateMockLyCi(),
                    OvershootContract.CreateMockLyCi(),
                    OvershootContract.CreateMockLyCi()
                }
            };
        }
    }
    
    public class OvershootContract
    {
        public string AssetId { get; set; }
        
        
        public OvershootThresholdContract[] Thresholds { get; set; }


        public static OvershootContract CreateMockLyCi()
        {
            return new OvershootContract
            {
                AssetId = "LyCI",
                Thresholds = OvershootThresholdContract.FillMockData()
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