using Microsoft.AspNetCore.Mvc;

namespace GullSharksAPI.Controllers
{
    public class FriendsListController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
