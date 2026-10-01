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

        Task<(bool Succeeded, string? UserId, IEnumerable<string> Roles, IEnumerable<string> Errors)> ValidateUserAsync(
            string userName,
            string password);

        Task CreateRoleAsync(string roleName);
        Task AddUserToRoleAsync(
    string userId,
    string roleName);

    }
}
