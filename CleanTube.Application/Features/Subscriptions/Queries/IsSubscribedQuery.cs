using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Domain.Entities;
using MediatR;

namespace CleanTube.Application.Features.Subscriptions.Queries
{
    public class IsSubscribedQuery : IRequest<bool>
    {
        public int ChannelId { get; set; }
    }
}
