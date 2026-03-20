using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoDevAcademy.Api.Data;
using ProjetoDevAcademy.Api.Models;
using ProjetoDevAcademy.Api.Models.DTOs;

namespace ProjetoDevAcademy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CursosController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<Curso>>> GetAll()
        {
            var cursos = _context.Cursos.Select(c => new CursoResponseDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                CargaHoraria = c.CargaHoraria,
            }).ToListAsync();
            return StatusCode(200, new {cursos});
        }
        [HttpPost]
        [Authorize(Roles = "Admin,Professor")]
        public async Task<IActionResult> CreateCurso(CreateCursoDto dto)
        {
            var newCurso = new Curso
            {
                Title = dto.Title,
                Description = dto.Description,
                CargaHoraria = dto.Hours
            };
            _context.Cursos.Add(newCurso);
            await _context.SaveChangesAsync();
            return StatusCode(201, new { Message = "Curso Criado com Sucesso!" });
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteCurso(int id)
        {
            var curso = await _context.Cursos.FindAsync(id);
            _context.Cursos.Remove(curso);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
