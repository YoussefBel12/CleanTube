using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CleanTube.Application.Dtos.Videos;
using CleanTube.Application.Interfaces;
using MediatR;

namespace CleanTube.Application.Features.Videos.Queries
{
    public class GetAllVideosQueryHandler
     : IRequestHandler<GetAllVideosQuery, IEnumerable<VideoDto>>
    {
        private readonly IVideoRepository _videoRepository;
        private readonly IMapper _mapper;

        public GetAllVideosQueryHandler(
            IVideoRepository videoRepository,
            IMapper mapper)
        {
            _videoRepository = videoRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<VideoDto>> Handle(
            GetAllVideosQuery request,
            CancellationToken cancellationToken)
        {
            var videos = await _videoRepository.GetAllAsync();

            return _mapper.Map<IEnumerable<VideoDto>>(videos);
        }
    }
}
