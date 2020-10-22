using AutoMapper;
using Blog.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Data
{
    public class AppRepository : IAppRepository
    {
        private DataContext _context;

        public AppRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void UpdatePost(int postId, Post post)
        {
            var entity = _context.Posts.Where(p => p.Id == postId).FirstOrDefault();
            entity.Title = post.Title;
            entity.Text = post.Text;
            entity.PhotoUrl = post.PhotoUrl != null ? post.PhotoUrl : entity.PhotoUrl;
            entity.CategoryId = post.CategoryId;
            entity.DateUpdated = DateTime.Now;
        }

        public List<Category> GetCategories()
        {
            var categories = _context.Categories.Include(c => c.Posts).ToList();
            return categories;
        }

        public Category GetCategoryById(int categoryId)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == categoryId);
            return category;
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public List<Comment> GetCommentsByPost(int postId)
        {
            var comments = _context.Comments.Include(c => c.User).Where(c => c.PostId == postId && c.ParentId == null).OrderByDescending(c => c.DateAdded).ToList();
            return comments;
        }

        public List<Comment> GetSubCommentsByPost(int postId)
        {
            var comments = _context.Comments.Include(c => c.User).Where(c => c.PostId == postId && c.ParentId != null).OrderByDescending(c => c.DateAdded).ToList();
            return comments;
        }

        public Post GetPostById(int postId)
        {
            var post = _context.Posts.Include(p => p.Comments).Include(p => p.User).Include(p => p.Category).FirstOrDefault(p => p.Id == postId);
            return post;
        }

        public List<Post> GetPosts()
        {
            var posts = _context.Posts.Include(p => p.User).Include(p => p.Category).OrderByDescending(p => p.DateAdded).ToList();
            return posts;
        }

        public List<Post> GetLastPosts()
        {
            var posts = _context.Posts.Include(p => p.User).Include(p => p.Category).OrderByDescending(p => p.DateAdded).Take(3).ToList();
            return posts;
        }

        public List<Post> GetPostsByCategory(int categoryId)
        {
            var posts = _context.Posts.Include(p => p.User).Include(p => p.Category).Where(p => p.CategoryId == categoryId).OrderByDescending(p => p.DateAdded).ToList();
            return posts;
        }

        public List<Post> GetPostsByUser(int userId)
        {
            var posts = _context.Posts.Include(p => p.User).Include(p => p.Category).Where(p => p.UserId == userId).OrderByDescending(p => p.DateAdded).ToList();
            return posts;
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }

        public User GetUserById(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            return user;
        }

        public List<User> GetUsers()
        {
            var users = _context.Users.ToList();
            return users;
        }
    }
}
