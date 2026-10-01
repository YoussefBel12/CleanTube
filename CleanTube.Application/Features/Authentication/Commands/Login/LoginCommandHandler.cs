using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using MediatR;

namespace CleanTube.Application.Features.Authentication.Commands.Login
{
    public class LoginCommandHandler
      : IRequestHandler<LoginCommand, string>
    {
        private readonly IIdentityService _identityService;
        private readonly IJwtService _jwtService;

        public LoginCommandHandler(
            IIdentityService identityService,
            IJwtService jwtService)
        {
            _identityService = identityService;
            _jwtService = jwtService;
        }

        public async Task<string> Handle(
            LoginCommand request,
            CancellationToken cancellationToken)
        {
            var result = await _identityService.ValidateUserAsync(
                request.UserName,
                request.Password);

            if (!result.Succeeded)
            {
                throw new Exception(
                    string.Join(", ", result.Errors));
            }

            return _jwtService.GenerateToken(
                result.UserId!,
                request.UserName,
                result.Roles);
        }
    }
}
