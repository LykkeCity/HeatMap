using HeatMap.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace HeatMap.Web.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        
        [HttpGet]
        public  AssetContract[] Assets()
        {
            return AssetContract.GetMockResult();
        }
        
    }
}