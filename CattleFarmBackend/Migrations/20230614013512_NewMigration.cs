using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CattleFarmBackend.Migrations
{
    /// <inheritdoc />
    public partial class NewMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CattleFeeds",
                columns: table => new
                {
                    CattleFeedCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CattleCode = table.Column<int>(type: "int", nullable: false),
                    FeedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FoodName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FoodQuantity = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CattleFeeds", x => x.CattleFeedCode);
                });

            migrationBuilder.CreateTable(
                name: "CattleMeds",
                columns: table => new
                {
                    CattleMedCode = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CattleCode = table.Column<int>(type: "int", nullable: false),
                    MedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MedName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MedQuantity = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CattleMeds", x => x.CattleMedCode);
                });

            migrationBuilder.CreateTable(
                name: "Cattles",
                columns: table => new
                {
                    Code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Breed = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sex = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BornDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cattles", x => x.Code);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CattleFeeds");

            migrationBuilder.DropTable(
                name: "CattleMeds");

            migrationBuilder.DropTable(
                name: "Cattles");
        }
    }
}
