using CattleFarmAPI.DtoModels;
using CattleFarmAPI.Models;
using CattleFarmAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CattleFarmAPI.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class CattleMedController : ControllerBase
    {
        private readonly ILogger<CattleController> _logger;
        private CattleFarmRepository _db;

        public CattleMedController(ILogger<CattleController> logger)
        {
            _logger = logger;
            _db = new CattleFarmRepository();
        }

        [HttpGet("{cattleCode}")]
        public Task<IActionResult> GetCattleMedList(int cattleCode)
        {
            return _db.GetCattleMed(cattleCode);
        }

        [HttpPost]
        public Task<IActionResult> addCattleMed([FromBody] CattleMed cattleMed)
        {
            return _db.AddCattleMed(cattleMed);
        }

    }
}
