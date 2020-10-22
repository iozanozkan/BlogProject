using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class Post
    {
        public Post()
        {
            DateAdded = DateTime.Now;
            Comments = new List<Comment>();
        }
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime? DateUpdated { get; set; }

        public List<Comment> Comments { get; set; }
        public User User { get; set; }
        public Category Category { get; set; }
    }
}
