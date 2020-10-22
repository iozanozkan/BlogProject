using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Models
{
    public class Comment
    {
        public Comment()
        {
            DateAdded = DateTime.Now;
            SubComments = new List<Comment>();
        }
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PostId { get; set; }
        public string Text { get; set; }
        public DateTime DateAdded { get; set; }
        public int? ParentId { get; set; }

        public User User { get; set; }
        public Post Post { get; set; }
        public Comment Parent { get; set; }
        public List<Comment> SubComments { get; set; }
    }
}
