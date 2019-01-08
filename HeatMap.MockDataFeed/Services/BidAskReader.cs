using System.Linq;
using System.Threading.Tasks;
using Flurl;
using Flurl.Http;
using HeatMap.Domains;

namespace HeatMap.MockDataFeed.Services
{
    public static class BidAskReader
    {

        private static string _url;
        public static void Inject(string url)
        {
            _url = url;
        }
        
        public static async Task<IBidAsk[]> RequestDataAsync()
        {
            var result =  await _url
                .AppendPathSegments("Feed", "Profile")
                .GetJsonAsync<BidAskContract[]>();

            return result.Cast<IBidAsk>().ToArray();
        }
        
    }
}