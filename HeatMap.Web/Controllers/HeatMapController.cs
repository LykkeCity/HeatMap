using Microsoft.AspNetCore.Mvc;

namespace HeatMap.Web.Controllers
{
    public class HeatMapController : Controller
    {
        // GET
        public IActionResult Index()
        {
            return
            View();
        }
    }
}