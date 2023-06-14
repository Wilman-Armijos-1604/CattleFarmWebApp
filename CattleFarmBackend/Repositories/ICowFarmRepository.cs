using CattleFarmAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CattleFarmAPI.Repositories
{
    public interface ICattleFarmRepository
    {
        Task<IActionResult> GetCattles(); // Read All

        Task<IActionResult> GetCattleByCode(int cattleCode); // Read One

        Task<IActionResult> AddCattle(Cattle cattle); // Create One

        Task<IActionResult> UpdateCattleRole(int cattleCode, Cattle cattle); // Update One

        Task<IActionResult> DeleteCattle(int cattleCode); // Delete One

        Task<IActionResult> AddCattleFeed(CattleFeed cattleFeed); // Create One

        Task<IActionResult> GetCattleFeed(int cattleCode); // Read One

        Task<IActionResult> AddCattleMed(CattleMed cattleMed); // Create One

        Task<IActionResult> GetCattleMed(int cattleCode); // Read One
    }

}
