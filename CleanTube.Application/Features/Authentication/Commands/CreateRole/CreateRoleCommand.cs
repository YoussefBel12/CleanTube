using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace CleanTube.Application.Features.Authentication.Commands.CreateRole
{
    public class CreateRoleCommand : IRequest
    {
        public string RoleName { get; set; } = string.Empty;
    }
}
