using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blog.Dtos
{
    public class UserForUpdatePasswordDto
    {
        public string Password { get; set; }
        public string NewPassword { get; set; }
    }
}
