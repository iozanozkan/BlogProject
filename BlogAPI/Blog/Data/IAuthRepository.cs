using Blog.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string email, string password);
        Task<User> Update(int userId, User user);
        Task<User> UpdatePassword(int userId, string password, string newPassword);
        Task<bool> EmailExists(string email);
        Task<bool> UsernameExists(string username);
    }
}
