using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using MediatR;

namespace CleanTube.Application.Features.Authentication.Commands.Register
{
    public class RegisterCommandHandler
      : IRequestHandler<RegisterCommand, string>
    {
        private readonly IIdentityService _identityService;

        public RegisterCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<string> Handle(
            RegisterCommand request,
            CancellationToken cancellationToken)
        {
            var result = await _identityService.CreateUserAsync(
                request.UserName,
                request.Email,
                request.Password);

            if (!result.Succeeded)
            {
                throw new Exception(
                    string.Join(", ", result.Errors));
            }

            return result.UserId!;
        }
    }
}
