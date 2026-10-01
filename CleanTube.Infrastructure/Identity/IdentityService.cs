using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace CleanTube.Infrastructure.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public IdentityService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<(bool Succeeded, string? UserId, IEnumerable<string> Errors)> CreateUserAsync(
            string userName,
            string email,
            string password)
        {
            var user = new ApplicationUser
            {
                UserName = userName,
                Email = email
            };

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                return (
                    false,
                    null,
                    result.Errors.Select(e => e.Description));
            }

            return (true, user.Id, Enumerable.Empty<string>());
        }
    }
}