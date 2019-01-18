using HeatMap.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace HeatMap.Web.Controllers
{
    
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class HeatMapController : ControllerBase
    {
        [HttpGet]
        public OvershootResponseContract Overshoot(string assetPair)
        {
            return OvershootResponseContract.CreateMock();
        }
    }
}