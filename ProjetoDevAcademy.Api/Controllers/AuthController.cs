using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProjetoDevAcademy.Api.Data;
using ProjetoDevAcademy.Api.Models;
using ProjetoDevAcademy.Api.Models.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProjetoDevAcademy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AuthController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost("/auth/register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return StatusCode(500 , new { Message = "Usuário ja Existe" });
            }
            var newUser = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role
            };
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return StatusCode(201, new { Message = "Usuário Registrado com Sucesso!" });
        }
        [HttpPost("/auth/login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            var passwordValid = false;
            if (user != null)
            {
                passwordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.Password);
            }
            if (passwordValid)
            {
                var token = CriarToken(user);
                return StatusCode(200, new { Token = token });
            }
            return StatusCode(401, new { Message = "Email ou Senha Inválidos" });
        }
        private string CriarToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim("name", user.Name),
                new Claim("role", user.Role),
            };
            var key = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes("minha-chave-super-segura-com-32-caracteres")
                );
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                    claims: claims,
                    signingCredentials: cred,
                    expires: DateTime.Now.AddHours(2)
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
    }
}
