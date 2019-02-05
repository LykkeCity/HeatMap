using System;
using System.Linq;
using System.Threading.Tasks;
using HeatMap.Domains;
using HeatMap.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace HeatMap.Web.Controllers
{
    
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class HeatMapController : ControllerBase
    {
        private readonly IIndexInformationRepository _indexInformationRepository;
        private readonly IBidAskHistoryRepository _bidAskHistoryRepository;
        private readonly IOvershootIndicatorsDataRepository _overshootIndicatorsDataRepository;

        public HeatMapController(IIndexInformationRepository indexInformationRepository, IBidAskHistoryRepository bidAskHistoryRepository,
            IOvershootIndicatorsDataRepository overshootIndicatorsDataRepository)
        {
            _indexInformationRepository = indexInformationRepository;
            _bidAskHistoryRepository = bidAskHistoryRepository;
            _overshootIndicatorsDataRepository = overshootIndicatorsDataRepository;
        }


        private const string AssetLci = "LCI";
        private const string AssetPairLci = "LCIUSD";
        
        [HttpGet]
        public async ValueTask<OvershootResponseContract> Overshoot(string assetPair)
        {

            var dict = (await _bidAskHistoryRepository.GetAllAsync()).ToDictionary(itm => itm.Id);

            var indicators = await _overshootIndicatorsDataRepository.GetAsync();
            
            var indexInfo = await _indexInformationRepository.GetAsync(AssetLci);

            var result = OvershootResponseContract.Create(indexInfo.AssetsInfo, 
                id => dict.ContainsKey(id) ? dict[id].History : Array.Empty<double>());


            if (indicators.ContainsKey(AssetPairLci))
                result.Index.Thresholds = indicators[AssetPairLci].Select(OvershootThresholdContract.Create).ToArray();

            foreach (var part in result.Parts)
            {
                var id = part.AssetId + "USD";

                if (indicators.ContainsKey(id))
                    part.Thresholds = indicators[id].Select(OvershootThresholdContract.Create).ToArray();
            }


            return result;


        }
    }
}