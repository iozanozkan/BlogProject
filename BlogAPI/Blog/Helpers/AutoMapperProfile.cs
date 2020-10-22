using AutoMapper;
using Blog.Dtos;
using Blog.Models;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Blog.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Post, PostForListDto>();
            CreateMap<Post, PostForDetailDto>();
            CreateMap<Comment, CommentForListDto>();
            CreateMap<Category, CategoryListForDto>();
            CreateMap<User, UserForDetailDto>();
        }
    }
}
