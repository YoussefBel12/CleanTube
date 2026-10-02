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
        private readonly ICurrentUserService _currentUserService;

        public IsSubscribedQueryHandler(
            ISubscriptionRepository subscriptionRepository,
            ICurrentUserService currentUserService)
        {
            _subscriptionRepository = subscriptionRepository;
            _currentUserService = currentUserService;
        }

        public async Task<bool> Handle(
            IsSubscribedQuery request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            if (userId is null)
                throw new UnauthorizedAccessException();

            var subscription =
                await _subscriptionRepository.GetByUserAndChannelAsync(
                    userId,
                    request.ChannelId);

            return subscription is not null;
        }
    }
}
