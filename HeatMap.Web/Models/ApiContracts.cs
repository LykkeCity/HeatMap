namespace HeatMap.Web.Models
{
    public class AssetContract
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Accuracy { get; set; }

        public static AssetContract Create(string id, string name, int accuracy)
        {
            return new AssetContract
            {
                Id = id,
                Name = name,
                Accuracy = accuracy
            };
        }

        private static readonly AssetContract[] Mock =
        {
            Create("BTC", "BTC", 8),
            Create("XRP", "XRP", 8),       
            Create("ETH", "ETH", 8),
            
            Create("BCH", "BCH", 8),
            Create("EOS", "EOS", 8),
            Create("XLM", "XLM", 8),
            Create("LTC", "LTC", 8),
            Create("TRX", "TRX", 8),
            Create("ETC", "ETC", 8),

        };

        public static AssetContract[] GetMockResult()
        {
            return Mock;
        }
    }


    public class AssetDataContract
    {
        public string Id { get; private set; }
        public double Rate { get; private set; }

        public double[] History { get; private set; }

        public static AssetDataContract Create(string id, double rate, double[] history)
        {
            return new AssetDataContract
            {
                Id = id,
                Rate = rate,
                History = history
            };
        }
    }
}