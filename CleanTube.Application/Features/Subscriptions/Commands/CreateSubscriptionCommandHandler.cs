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
    public class CreateSubscriptionCommandHandler
    : IRequestHandler<CreateSubscriptionCommand, int>
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;

        public CreateSubscriptionCommandHandler(
            ISubscriptionRepository subscriptionRepository,
            IUnitOfWork unitOfWork,
            ICurrentUserService currentUserService)
        {
            _subscriptionRepository = subscriptionRepository;
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        public async Task<int> Handle(
            CreateSubscriptionCommand request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            if (userId is null)
                throw new UnauthorizedAccessException();

            var existingSubscription =
                await _subscriptionRepository.GetByUserAndChannelAsync(
                    userId,
                    request.ChannelId);

            if (existingSubscription is not null)
                return existingSubscription.Id;

            var subscription = new Subscription
            {
                UserId = userId,
                ChannelId = request.ChannelId,
                SubscribedAt = DateTime.UtcNow
            };

            await _subscriptionRepository.AddAsync(subscription);

            await _unitOfWork.SaveChangesAsync();

            return subscription.Id;
        }
    }
}
