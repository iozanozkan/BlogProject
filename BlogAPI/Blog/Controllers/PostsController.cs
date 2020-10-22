using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Blog.Data;
using Blog.Dtos;
using Blog.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : Controller
    {
        private IAppRepository _appRepository;
        private IMapper _mapper;

        public PostsController(IAppRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }


        [HttpPost]
        [Route("add")]
        [Authorize(Roles = Role.Admin)]
        public ActionResult Add([FromBody]Post post)
        {
            _appRepository.Add(post);
            _appRepository.SaveAll();
            return Ok(post);
        }

        [HttpPost]
        [Route("update")]
        [Authorize(Roles = Role.Admin)]
        public ActionResult Update(int id,[FromBody] Post post)
        {
            _appRepository.UpdatePost(id, post);
            _appRepository.SaveAll();
            return Ok(post);
        }

        [HttpPost]
        [Route("delete")]
        [Authorize(Roles = Role.Admin)]
        public ActionResult Delete(Post post)
        {
            _appRepository.Delete(post);
            _appRepository.SaveAll();
            return Ok(post);
        }

        public ActionResult GetPosts()
        {
            var posts = _appRepository.GetPosts();
            var postsToReturn = _mapper.Map<List<PostForListDto>>(posts);
            return Ok(postsToReturn);
        }

        [HttpGet]
        [Route("lastPosts")]
        public ActionResult GetLastPosts()
        {
            var posts = _appRepository.GetLastPosts();
            var postsToReturn = _mapper.Map<List<PostForListDto>>(posts);
            return Ok(postsToReturn);
        }

        [HttpGet]
        [Route("detail")]
        public ActionResult GetPostById(int id)
        {
            var post = _appRepository.GetPostById(id);
            var postToReturn = _mapper.Map<PostForDetailDto>(post);
            return Ok(postToReturn);
        }

        [HttpGet]
        [Route("byUser")]
        public ActionResult GetPostsByUserId(int id)
        {
            var posts = _appRepository.GetPostsByUser(id);
            var postsToReturn = _mapper.Map<List<PostForListDto>>(posts);
            return Ok(postsToReturn);
        }

        [HttpGet]
        [Route("byCategory")]
        public ActionResult GetPostsByCategory(int id)
        {
            var posts = _appRepository.GetPostsByCategory(id);
            var postsToReturn = _mapper.Map<List<PostForListDto>>(posts);
            return Ok(postsToReturn);
        }
    }
}
