using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjetoDevAcademy.Api.Migrations
{
    /// <inheritdoc />
    public partial class _2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Hours",
                table: "Cursos",
                newName: "CargaHoraria");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CargaHoraria",
                table: "Cursos",
                newName: "Hours");
        }
    }
}
