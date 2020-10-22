using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Blog.Data;
using Blog.Dtos;
using Blog.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : Controller
    {
        private IAppRepository _appRepository;
        private IMapper _mapper;

        public CategoriesController(IAppRepository appRepository, IMapper mapper)
        {
            _appRepository = appRepository;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("add")]
        public ActionResult Add([FromBody] Category category)
        {
            _appRepository.Add(category);
            _appRepository.SaveAll();
            return Ok(category);
        }

        [HttpPost]
        [Route("update")]
        public ActionResult Update([FromBody] Category category)
        {
            //_appRepository.Update(category);
            _appRepository.SaveAll();
            return Ok(category);
        }

        [HttpPost]
        [Route("delete")]
        public ActionResult Delete(Category category)
        {
            _appRepository.Delete(category);
            _appRepository.SaveAll();
            return Ok(category);
        }

        public ActionResult GetCategories()
        {
            var categories = _appRepository.GetCategories();
            var categoriesToReturn = _mapper.Map<List<CategoryListForDto>>(categories);
            return Ok(categoriesToReturn);
        }

        [HttpGet]
        [Route("byId")]
        public ActionResult GetCategoryById(int id)
        {
            var category = _appRepository.GetCategoryById(id);
            return Ok(category);
        }
    }
}
