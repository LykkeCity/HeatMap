using System;
using System.IO;
using Common;
using HeatMap.Services;

namespace HeatMap.Web
{
    public class SettingsModel : IServicesSettings
    {
        public string CacheUrl { get; set; }


        public static SettingsModel Create()
        {
            var home = Environment.GetEnvironmentVariable("HOME").AddLastSymbolIfNotExists('/')+".heatmap";
            var json = File.ReadAllText(home);

            return Newtonsoft.Json.JsonConvert.DeserializeObject<SettingsModel>(json);
        }
    }
    
    

}