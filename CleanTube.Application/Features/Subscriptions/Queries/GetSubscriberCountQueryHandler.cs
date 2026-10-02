using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using MediatR;

namespace CleanTube.Application.Features.Subscriptions.Queries
{
    public class GetSubscriberCountQueryHandler
     : IRequestHandler<GetSubscriberCountQuery, int>
    {
        private readonly ISubscriptionRepository _subscriptionRepository;

        public GetSubscriberCountQueryHandler(
            ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }

        public async Task<int> Handle(
            GetSubscriberCountQuery request,
            CancellationToken cancellationToken)
        {
            var subscriptions =
                await _subscriptionRepository.GetByChannelIdAsync(
                    request.ChannelId);

            return subscriptions.Count();
        }
    }
}
