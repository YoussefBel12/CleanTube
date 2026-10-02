using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace CleanTube.Application.Features.Subscriptions.Commands
{
    public class DeleteSubscriptionCommand : IRequest
    {
        public int ChannelId { get; set; }
    }
}
