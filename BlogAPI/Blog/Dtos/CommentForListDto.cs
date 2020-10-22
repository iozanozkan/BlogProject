using Blog.Models;
using System;
using System.Collections.Generic;
namespace Blog.Dtos
{
    public class CommentForListDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        public string UserPhotoUrl { get; set; }
        public int PostId { get; set; }
        public string Text { get; set; }
        public DateTime DateAdded { get; set; }
        public int? ParentId { get; set; }
        public List<Comment> SubComments { get; set; }
    }
}
