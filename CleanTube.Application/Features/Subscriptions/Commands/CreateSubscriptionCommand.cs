using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using CleanTube.Domain.Entities;
using MediatR;

namespace CleanTube.Application.Features.Subscriptions.Commands
{
    public class CreateSubscriptionCommand : IRequest<int>
    {
        public int ChannelId { get; set; }
    }

}
