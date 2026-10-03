using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Dtos.Channels;
using MediatR;

namespace CleanTube.Application.Features.Channels.Queries
{
    public class GetMyChannelQuery : IRequest<ChannelDto?>
    {
    }
}
