using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using MediatR;

namespace CleanTube.Application.Features.Subscriptions.Queries
{
    public class IsSubscribedQueryHandler
     : IRequestHandler<IsSubscribedQuery, bool>
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IChannelRepository _channelRepository;
        private readonly ICurrentUserService _currentUserService;

        public IsSubscribedQueryHandler(
            ISubscriptionRepository subscriptionRepository,
            IChannelRepository channelRepository,
            ICurrentUserService currentUserService)
        {
            _subscriptionRepository = subscriptionRepository;
            _channelRepository = channelRepository;
            _currentUserService = currentUserService;
        }

        public async Task<bool> Handle(
            IsSubscribedQuery request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            if (userId is null)
                throw new UnauthorizedAccessException();

            var channel = await _channelRepository.GetByIdAsync(
                request.ChannelId);

            if (channel is null)
                throw new KeyNotFoundException("Channel not found.");

            var subscription =
                await _subscriptionRepository.GetByUserAndChannelAsync(
                    userId,
                    request.ChannelId);

            return subscription is not null;
        }
    }
}
