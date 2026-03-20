using Microsoft.EntityFrameworkCore;
using ProjetoDevAcademy.Api.Models;

namespace ProjetoDevAcademy.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Curso> Cursos { get; set; }
    }
}
