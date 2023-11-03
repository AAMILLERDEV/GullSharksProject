using Microsoft.AspNetCore.Mvc;

namespace GullSharksAPI.Controllers
{
    public class OrderDetailsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
