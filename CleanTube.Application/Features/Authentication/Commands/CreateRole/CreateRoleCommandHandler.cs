using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using MediatR;

namespace CleanTube.Application.Features.Authentication.Commands.CreateRole
{
    public class CreateRoleCommandHandler
     : IRequestHandler<CreateRoleCommand>
    {
        private readonly IIdentityService _identityService;

        public CreateRoleCommandHandler(
            IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task Handle(
            CreateRoleCommand request,
            CancellationToken cancellationToken)
        {
            await _identityService.CreateRoleAsync(
                request.RoleName);
        }
    }
}
