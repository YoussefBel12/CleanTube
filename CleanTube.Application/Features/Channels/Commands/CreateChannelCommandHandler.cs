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

        public CreateChannelCommandHandler(
            IChannelRepository channelRepository,
            IUnitOfWork unitOfWork)
        {
            _channelRepository = channelRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<int> Handle(
            CreateChannelCommand request,
            CancellationToken cancellationToken)
        {
            var channel = new Channel
            {
                Name = request.Name
            };

            await _channelRepository.AddAsync(channel);
            await _unitOfWork.SaveChangesAsync();

            return channel.Id;
        }
    }
}
