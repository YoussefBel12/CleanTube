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
    public class GetMyChannelsQueryHandler
     : IRequestHandler<GetMyChannelsQuery, IEnumerable<ChannelDto>>
    {
        private readonly IChannelRepository _channelRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public GetMyChannelsQueryHandler(
            IChannelRepository channelRepository,
            ICurrentUserService currentUserService,
            IMapper mapper)
        {
            _channelRepository = channelRepository;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ChannelDto>> Handle(
            GetMyChannelsQuery request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            if (userId is null)
                throw new UnauthorizedAccessException();

            var channels = await _channelRepository
                .GetByOwnerIdAsync(userId);

            return _mapper.Map<IEnumerable<ChannelDto>>(channels);
        }
    }
}
