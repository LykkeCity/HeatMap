using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Flurl;
using Flurl.Http;
using HeatMap.Domains;
using HeatMap.Services;
using Newtonsoft.Json;

namespace HeatMap.MockDataFeed.Services
{

    public class BidAskContract : IBidAsk
    {
        [JsonProperty("Asset")]
        public string Id { get; set; }
        public DateTime DateTime { get; set; }
        public double Bid { get; set; }
        public double Ask { get; set; }
    }

    public static class BidAskWriter
    {

        public static BidAskRepository BidAskRepository { get; private set; }

        public static string BidAskRepositoryUrl;


        public static void Inject(BidAskRepository bidAskRepository)
        {
            BidAskRepository = bidAskRepository;
        }


        public static async Task UpdateAsync(IBidAsk[] items)
        {
            await BidAskRepository.UpdateAsync(items);
        }

    }
}