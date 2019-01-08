namespace HeatMap.Web.Models
{
    public class AssetContract
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public static AssetContract Create(string id, string name)
        {
            return new AssetContract
            {
                Id = id,
                Name = name
            };
        }


        private static AssetContract[] _mock = new []
        {
            Create("EURUSD", "EUR/USD"), 
            Create("AUDCAD", "AUD/CAD"),
            Create("GBPUSD", "GBP/USD"),
            Create("USDCHF", "USD/CHF"),
        };
        
        public static AssetContract[] GetMockResult()
        {
            return _mock; 
        }
    }
}