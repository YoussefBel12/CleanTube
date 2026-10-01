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
    public class GetVideoByIdQueryHandler
     : IRequestHandler<GetVideoByIdQuery, VideoDto?>
    {
        private readonly IVideoRepository _videoRepository;
        private readonly IMapper _mapper;

        public GetVideoByIdQueryHandler(
            IVideoRepository videoRepository,
            IMapper mapper)
        {
            _videoRepository = videoRepository;
            _mapper = mapper;
        }

        public async Task<VideoDto?> Handle(
            GetVideoByIdQuery request,
            CancellationToken cancellationToken)
        {
            var video = await _videoRepository.GetByIdAsync(request.Id);

            if (video is null)
                return null;

            return _mapper.Map<VideoDto>(video);
        }
    }
}
