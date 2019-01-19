using System;
using System.IO;
using Common;

namespace HeatMap.DataJob
{
    public class SettingsModel 
    {
        public string CacheUrl { get; set; }
        public string RabbitMqConnectionString { get; set; }
        public string RabbitMqExchange { get; set; }
        public static SettingsModel Create()
        {
            var home = Environment.GetEnvironmentVariable("HOME").AddLastSymbolIfNotExists('/')+".heatmapdatajob";
            var json = File.ReadAllText(home);

            return Newtonsoft.Json.JsonConvert.DeserializeObject<SettingsModel>(json);
        }
    }

}