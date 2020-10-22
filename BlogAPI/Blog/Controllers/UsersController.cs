using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Blog.Data;
using Blog.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IAppRepository _appRepository;
        private IMapper _mapper;

        public UsersController(IAppRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        public ActionResult GetUsers()
        {
            var users = _appRepository.GetUsers();
            var usersToReturn = _mapper.Map<List<UserForDetailDto>>(users);
            return Ok(usersToReturn);
        }

        [HttpGet]
        [Route("byId")]
        public ActionResult GetUserById(int id)
        {
            var user = _appRepository.GetUserById(id);
            var userToReturn = _mapper.Map<UserForDetailDto>(user);
            return Ok(userToReturn);
        }
    }
}
