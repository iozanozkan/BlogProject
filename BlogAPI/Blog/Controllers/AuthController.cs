using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Blog.Data;
using Blog.Dtos;
using Blog.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        IAuthRepository _authRepository;
        IAppRepository _appRepository;
        IConfiguration _configuration;

        public AuthController(IAuthRepository authRepository, IAppRepository appRepository, IConfiguration configuration)
        {
            _authRepository = authRepository;
            _appRepository = appRepository;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody]UserForRegisterDto userForRegisterDto)
        {
            if(await _authRepository.EmailExists(userForRegisterDto.Email))
            {
                ModelState.AddModelError("EMail", "E-mail already exists");
            }

            if (await _authRepository.UsernameExists(userForRegisterDto.Username))
            {
                ModelState.AddModelError("Username", "Username already exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userToCreate = new User
            {
                Email = userForRegisterDto.Email,
                Username = userForRegisterDto.Username,
                Name = userForRegisterDto.Name,
                Surname = userForRegisterDto.Surname,
                PhotoUrl = "Resources\\Images\\user.png",
                Role = "User"
            };

            var createdUser = await _authRepository.Register(userToCreate, userForRegisterDto.Password);
            return StatusCode(201);
        }

        [HttpPost("update")]
        public async Task<ActionResult> Update(int id, [FromBody] UserForRegisterDto userForRegisterDto)
        {
            User user = _appRepository.GetUserById(id);
            if (user.Email != userForRegisterDto.Email || user.Username != userForRegisterDto.Username)
            {
                if (await _authRepository.EmailExists(userForRegisterDto.Email))
                {
                    if(user.Email != userForRegisterDto.Email)
                        ModelState.AddModelError("EMail", "E-mail already exists");
                }

                if (await _authRepository.UsernameExists(userForRegisterDto.Username))
                {
                    if(user.Username != userForRegisterDto.Username)
                        ModelState.AddModelError("Username", "Username already exists");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
            }

            var userToUpdate = new User
            {
                Email = userForRegisterDto.Email != null ? userForRegisterDto.Email : user.Email,
                Username = userForRegisterDto.Username != null ? userForRegisterDto.Username : user.Username,
                Name = userForRegisterDto.Name != null ? userForRegisterDto.Name : user.Name,
                Surname = userForRegisterDto.Surname != null ? userForRegisterDto.Surname : user.Surname,
                PhotoUrl = userForRegisterDto.PhotoUrl != null ? userForRegisterDto.PhotoUrl : user.PhotoUrl,
                Role = user.Role
            };

            var updated = await _authRepository.Update(id, userToUpdate);
            return StatusCode(201);
        }

        [HttpPost("updatePassword")]
        public async Task<ActionResult> UpdatePassword(int id, [FromBody] UserForUpdatePasswordDto userForUpdatePasswordDto)
        {
            var updated = await _authRepository.UpdatePassword(id, userForUpdatePasswordDto.Password, userForUpdatePasswordDto.NewPassword);

            if(updated == null)
            {
                return StatusCode(401);
            }
            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserForLoginDto userForLoginDto)
        {
            var user = await _authRepository.Login(userForLoginDto.Email, userForLoginDto.Password);

            if(user == null)
            {
                return Unauthorized();
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Secret").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(tokenString);
        }
    }
}
