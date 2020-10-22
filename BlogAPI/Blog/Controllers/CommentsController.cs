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
    [Authorize(Roles = Role.Admin + "," + Role.User)]
    public class CommentsController : Controller
    {
        private IAppRepository _appRepository;
        private IMapper _mapper;

        public CommentsController(IAppRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("add")]
        public ActionResult Add([FromBody] Comment comment)
        {
            _appRepository.Add(comment);
            _appRepository.SaveAll();
            return Ok(comment);
        }

        [HttpPost]
        [Route("update")]
        public ActionResult Update([FromBody] Comment comment)
        {
            //_appRepository.Update(comment);
            _appRepository.SaveAll();
            return Ok(comment);
        }

        [HttpPost]
        [Route("delete")]
        public ActionResult Delete(Comment comment)
        {
            _appRepository.Delete(comment);
            _appRepository.SaveAll();
            return Ok(comment);
        }

        [HttpGet]
        [Route("byPost")]
        [AllowAnonymous]
        public ActionResult GetCommentsByPost(int id)
        {
            var comments = _appRepository.GetCommentsByPost(id);
            var commentsToReturn = _mapper.Map<List<CommentForListDto>>(comments);
            return Ok(commentsToReturn);
        }

        [HttpGet]
        [Route("subByPost")]
        [AllowAnonymous]
        public ActionResult GetSubCommentsByPost(int id)
        {
            var comments = _appRepository.GetSubCommentsByPost(id);
            var commentsToReturn = _mapper.Map<List<CommentForListDto>>(comments);
            return Ok(commentsToReturn);
        }
    }
}
