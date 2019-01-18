namespace HeatMap.Web.Models
{
    public class OvershootContract
    {
        public string AssetId { get; set; }
        
        
        public OvershootThresholdContract[] Thresholds { get; set; }


        public static OvershootContract CreateMockLyCi()
        {
            return new OvershootContract
            {
                AssetId = "LyCI",
                Thresholds = new []
                {
                    OvershootThresholdContract.Create(0.1, 0.1, "up"), 
                    OvershootThresholdContract.Create(0.2, 0.4, "up"),
                    OvershootThresholdContract.Create(0.3, 0.6, "down"),
                    OvershootThresholdContract.Create(0.4, 0.8, "up"),
                    OvershootThresholdContract.Create(0.5, 1.0, "up")
                    
                }
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
    }
}