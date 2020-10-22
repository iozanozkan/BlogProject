using Blog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Data
{
    public interface IAppRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void UpdatePost(int postId, Post post);
        bool SaveAll();

        List<Category> GetCategories();
        Category GetCategoryById(int categoryId);
        List<Post> GetPosts();
        List<Post> GetLastPosts();
        List<Post> GetPostsByCategory(int categoryId);
        List<Post> GetPostsByUser(int userId);
        List<Comment> GetCommentsByPost(int postId);
        List<Comment> GetSubCommentsByPost(int postId);
        Post GetPostById(int postId);
        User GetUserById(int userId);
        List<User> GetUsers();
    }
}
