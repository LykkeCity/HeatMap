using HeatMap.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace HeatMap.Web.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class DictionariesController : ControllerBase
    {
        [HttpGet]
        public AssetContract[] Assets()
        {
            return AssetContract.GetMockResult();
        }
    }
}