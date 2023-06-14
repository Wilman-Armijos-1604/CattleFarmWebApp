using CattleFarmAPI.Models;
using CattleFarmAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CattleFarmAPI.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class CattleController : ControllerBase
    {
        private readonly ILogger<CattleController> _logger;
        private CattleFarmRepository _db;

        public CattleController(ILogger<CattleController> logger)
        {

            _logger = logger;
            _db = new CattleFarmRepository();
        }


        [HttpGet]
        [Route("")]
        public Task<IActionResult> GetCattleList()
        {
            return _db.GetCattles();
        }

        [HttpGet]
        [Route("{cattleCode}")]
        public Task<IActionResult> GetCattleByCode(int cattleCode)
        {
            return _db.GetCattleByCode(cattleCode);
        }

        [HttpPost]
        [Route("")]
        public Task<IActionResult> AddCattle([FromBody] Cattle cattle)
        {
            return _db.AddCattle(cattle);
        }

        [HttpPut]
        [Route("{cattleCode}")]
        public Task<IActionResult> UpdateCattleRole(int cattleCode, [FromBody] Cattle cattle) { 
            return _db.UpdateCattleRole(cattleCode, cattle);
        }

        [HttpDelete]
        [Route("{cattleCode}")]
        public Task<IActionResult> DeleteCattle(int cattleCode)
        {
            return _db.DeleteCattle(cattleCode);
        }

    }
}