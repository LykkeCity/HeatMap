using HeatMap.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace HeatMap.Web.Controllers
{
    
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class HeatMapController : ControllerBase
    {
        [HttpGet]
        public OvershootContract Overshoot(string assetPair)
        {
            return OvershootContract.CreateMockLyCi();
        }
    }
}