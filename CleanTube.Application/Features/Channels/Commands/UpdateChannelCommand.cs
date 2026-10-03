using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace CleanTube.Application.Features.Channels.Commands
{
   
 

    public class UpdateChannelCommand : IRequest
    {
        public string Name { get; set; } = string.Empty;
    }

}
