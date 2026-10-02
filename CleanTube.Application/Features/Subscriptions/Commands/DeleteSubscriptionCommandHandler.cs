using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using MediatR;

namespace CleanTube.Application.Features.Subscriptions.Commands
{
    public class DeleteSubscriptionCommandHandler
    : IRequestHandler<DeleteSubscriptionCommand>
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;

        public DeleteSubscriptionCommandHandler(
            ISubscriptionRepository subscriptionRepository,
            IUnitOfWork unitOfWork,
            ICurrentUserService currentUserService)
        {
            _subscriptionRepository = subscriptionRepository;
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        public async Task Handle(
            DeleteSubscriptionCommand request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            if (userId is null)
                throw new UnauthorizedAccessException();

            var subscription =
                await _subscriptionRepository.GetByUserAndChannelAsync(
                    userId,
                    request.ChannelId);

            if (subscription is null)
                return;

            _subscriptionRepository.Delete(subscription);

            await _unitOfWork.SaveChangesAsync();
        }
    }
}
