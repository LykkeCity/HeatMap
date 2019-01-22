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

        public HeatMapController(IIndexInformationRepository indexInformationRepository, IBidAskHistoryRepository bidAskHistoryRepository)
        {
            _indexInformationRepository = indexInformationRepository;
            _bidAskHistoryRepository = bidAskHistoryRepository;
        }
        
        
        [HttpGet]
        public async ValueTask<OvershootResponseContract> Overshoot(string assetPair)
        {

            var dict = (await _bidAskHistoryRepository.GetAllAsync()).ToDictionary(itm => itm.Id);
            
            var indexInfo = await _indexInformationRepository.GetAsync("LCI");
            return OvershootResponseContract.CreateMock(indexInfo.AssetsInfo, 
                id => dict.ContainsKey(id) ? dict[id].History : Array.Empty<double>());
        }
    }
}