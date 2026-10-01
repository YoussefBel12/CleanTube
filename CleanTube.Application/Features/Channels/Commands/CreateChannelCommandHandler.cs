using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using CleanTube.Domain.Entities;
using MediatR;

namespace CleanTube.Application.Features.Channels.Commands
{
    public class CreateChannelCommandHandler
     : IRequestHandler<CreateChannelCommand, int>
    {
        private readonly IChannelRepository _channelRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;

        public CreateChannelCommandHandler(
            IChannelRepository channelRepository,
            IUnitOfWork unitOfWork,
            ICurrentUserService currentUserService)
        {
            _channelRepository = channelRepository;
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        public async Task<int> Handle(
            CreateChannelCommand request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            if (userId is null)
                throw new UnauthorizedAccessException();

            var channel = new Channel
            {
                Name = request.Name,
                OwnerId = userId
            };

            await _channelRepository.AddAsync(channel);
            await _unitOfWork.SaveChangesAsync();

            return channel.Id;
        }
    }
}
