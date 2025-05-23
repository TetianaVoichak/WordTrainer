using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DictionaryCheckApi.Migrations
{
    /// <inheritdoc />
    public partial class ChangeTexttoTextWord : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Text",
                table: "Words",
                newName: "TextWord");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TextWord",
                table: "Words",
                newName: "Text");
        }
    }
}
