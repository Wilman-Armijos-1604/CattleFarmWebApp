using CattleFarmAPI.Models;
using CattleFarmAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CattleFarmAPI.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class CattleFeedController : ControllerBase
    {
        private readonly ILogger<CattleController> _logger;
        private CattleFarmRepository _db;

        public CattleFeedController(ILogger<CattleController> logger)
        {
            _logger = logger;
            _db = new CattleFarmRepository();
        }

        [HttpGet("{cattleCode}")]
        public Task<IActionResult> GetCattleMedList(int cattleCode)
        {
            return _db.GetCattleFeed(cattleCode);
        }

        [HttpPost]
        public Task<IActionResult> addCattleMFed([FromBody] CattleFeed cattleFeed)
        {
            return _db.AddCattleFeed(cattleFeed);
        }
    }
}
