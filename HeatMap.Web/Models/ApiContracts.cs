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

        private static AssetContract[] _mock = new[]
        {
            Create("EURUSD", "EUR/USD", 5),
            Create("AUDCAD", "AUD/CAD", 5),
            Create("GBPUSD", "GBP/USD", 5),
            Create("USDCHF", "USD/CHF", 5),
            Create("USDJPY", "USD/JPY", 3),
            Create("USDCAD", "USD/CAD", 5),
            Create("EURNZD", "EUR/NZD", 5),
            Create("EURGBP", "EUR/GBP", 5),
            Create("EURCAD", "EUR/CAD", 5),
        };

        public static AssetContract[] GetMockResult()
        {
            return _mock;
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