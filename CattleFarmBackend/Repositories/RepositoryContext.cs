using CattleFarmAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CattleFarmAPI.Repositories
{
    public class RepositoryContext: DbContext
    {
        private readonly IConfiguration _configuration;
        public RepositoryContext()
        {
            _configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .Build();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("SQLConnection"));
        }

        public DbSet<Cattle> Cattles { get; set; }

        public DbSet<CattleFeed> CattleFeeds { get; set;}

        public DbSet<CattleMed> CattleMeds { get; set; }

    }
}
