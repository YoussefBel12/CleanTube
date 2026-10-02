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
    public class GetChannelByIdQueryHandler
    : IRequestHandler<GetChannelByIdQuery, ChannelDto?>
    {
        private readonly IChannelRepository _channelRepository;
        private readonly IMapper _mapper;

        public GetChannelByIdQueryHandler(
            IChannelRepository channelRepository,
            IMapper mapper)
        {
            _channelRepository = channelRepository;
            _mapper = mapper;
        }

        public async Task<ChannelDto?> Handle(
            GetChannelByIdQuery request,
            CancellationToken cancellationToken)
        {
            var channel = await _channelRepository.GetByIdAsync(
                request.Id);

            if (channel is null)
                return null;

            return _mapper.Map<ChannelDto>(channel);
        }
    }
}
