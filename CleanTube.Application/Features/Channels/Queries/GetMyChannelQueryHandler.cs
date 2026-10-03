using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CleanTube.Application.Dtos.Channels;
using CleanTube.Application.Interfaces;
using MediatR;

namespace CleanTube.Application.Features.Channels.Queries
{


    public class GetMyChannelQueryHandler
        : IRequestHandler<GetMyChannelQuery, ChannelDto?>
    {
        private readonly IChannelRepository _channelRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public GetMyChannelQueryHandler(
            IChannelRepository channelRepository,
            ICurrentUserService currentUserService,
            IMapper mapper)
        {
            _channelRepository = channelRepository;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<ChannelDto?> Handle(
            GetMyChannelQuery request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            if (string.IsNullOrEmpty(userId))
                return null;

            var channels =
                await _channelRepository.GetByOwnerIdAsync(userId);

            var channel = channels.FirstOrDefault();

            if (channel is null)
                return null;

            return _mapper.Map<ChannelDto>(channel);
        }
    }

}