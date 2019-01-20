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

        public HeatMapController(IIndexInformationRepository indexInformationRepository)
        {
            _indexInformationRepository = indexInformationRepository;
        }
        
        
        [HttpGet]
        public async ValueTask<OvershootResponseContract> Overshoot(string assetPair)
        {
            var indexInfo = await _indexInformationRepository.GetAsync("LCI");
            return OvershootResponseContract.CreateMock(indexInfo.AssetsInfo);
        }
    }
}