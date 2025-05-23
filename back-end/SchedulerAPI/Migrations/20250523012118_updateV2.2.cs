using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchedulerAPI.Migrations
{
    /// <inheritdoc />
    public partial class updateV22 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$11$dc7/3OhfDj1DxaWofWX0mOOm75jJbOinhP4srvGlmyMKg/xHDMQb2");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$11$dc7/3OhfDj1DxaWofWX0mOOm75jJbOinhP4srvGlmyMKg/xHDMQb2");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "Password@123");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "Password@123");
        }
    }
}
