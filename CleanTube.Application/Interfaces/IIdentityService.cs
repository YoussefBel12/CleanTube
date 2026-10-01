using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanTube.Application.Interfaces
{
    public interface IIdentityService
    {
        Task<(bool Succeeded, string? UserId, IEnumerable<string> Errors)> CreateUserAsync(
            string userName,
            string email,
            string password);
    }
}
