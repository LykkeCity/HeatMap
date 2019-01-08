using System;
using System.IO;
using Common;

namespace HeatMap.MockDataFeed
{
    public class SettingsModel 
    {
        public string CacheUrl { get; set; }
        public string BidAskUrl { get; set; }

        public static SettingsModel Create()
        {
            var home = Environment.GetEnvironmentVariable("HOME").AddLastSymbolIfNotExists('/')+".heatmapmock";
            var json = File.ReadAllText(home);

            return Newtonsoft.Json.JsonConvert.DeserializeObject<SettingsModel>(json);
        }
    }
    
    

}