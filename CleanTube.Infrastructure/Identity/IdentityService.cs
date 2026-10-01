using CleanTube.Application.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace CleanTube.Infrastructure.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public IdentityService(
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
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

            return (
                true,
                user.Id,
                Enumerable.Empty<string>());
        }

        public async Task<(bool Succeeded, string? UserId, IEnumerable<string> Roles, IEnumerable<string> Errors)> ValidateUserAsync(
            string userName,
            string password)
        {
            var user = await _userManager.FindByNameAsync(userName);

            if (user is null)
            {
                return (
                    false,
                    null,
                    Enumerable.Empty<string>(),
                    new[] { "Invalid username or password." });
            }

            var passwordValid = await _userManager.CheckPasswordAsync(
                user,
                password);

            if (!passwordValid)
            {
                return (
                    false,
                    null,
                    Enumerable.Empty<string>(),
                    new[] { "Invalid username or password." });
            }

            var roles = await _userManager.GetRolesAsync(user);

            return (
                true,
                user.Id,
                roles,
                Enumerable.Empty<string>());
        }

        public async Task CreateRoleAsync(string roleName)
        {
            if (await _roleManager.RoleExistsAsync(roleName))
                return;

            var result = await _roleManager.CreateAsync(
                new ApplicationRole
                {
                    Name = roleName
                });

            if (!result.Succeeded)
            {
                throw new Exception(
                    string.Join(
                        ", ",
                        result.Errors.Select(e => e.Description)));
            }
        }

        public async Task AddUserToRoleAsync(
    string userId,
    string roleName)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user is null)
                throw new Exception("User not found.");

            if (!await _roleManager.RoleExistsAsync(roleName))
                throw new Exception("Role does not exist.");

            var result = await _userManager.AddToRoleAsync(
                user,
                roleName);

            if (!result.Succeeded)
            {
                throw new Exception(
                    string.Join(
                        ", ",
                        result.Errors.Select(e => e.Description)));
            }
        }







    }
}

