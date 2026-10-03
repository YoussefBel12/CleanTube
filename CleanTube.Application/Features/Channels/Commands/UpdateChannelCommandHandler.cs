using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using MediatR;

namespace CleanTube.Application.Features.Channels.Commands
{
   

    public class UpdateChannelCommandHandler
        : IRequestHandler<UpdateChannelCommand>
    {
        private readonly IChannelRepository _channelRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IUnitOfWork _unitOfWork;

        public UpdateChannelCommandHandler(
            IChannelRepository channelRepository,
            ICurrentUserService currentUserService,
            IUnitOfWork unitOfWork)
        {
            _channelRepository = channelRepository;
            _currentUserService = currentUserService;
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(
            UpdateChannelCommand request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            if (string.IsNullOrEmpty(userId))
                throw new UnauthorizedAccessException(
                    "User is not authenticated.");

            var channels =
                await _channelRepository.GetByOwnerIdAsync(userId);

            var channel = channels.FirstOrDefault();

            if (channel is null)
                throw new KeyNotFoundException(
                    "You do not have a channel.");

            channel.Name = request.Name;

            _channelRepository.Update(channel);

            await _unitOfWork.SaveChangesAsync();
        }
    }


}
