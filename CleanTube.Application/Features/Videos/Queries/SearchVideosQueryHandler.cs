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
 


    public class SearchVideosQueryHandler
        : IRequestHandler<SearchVideosQuery, IEnumerable<VideoDto>>
    {
        private readonly IVideoRepository _videoRepository;
        private readonly IMapper _mapper;

        public SearchVideosQueryHandler(
            IVideoRepository videoRepository,
            IMapper mapper)
        {
            _videoRepository = videoRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<VideoDto>> Handle(
            SearchVideosQuery request,
            CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.Query))
                return Enumerable.Empty<VideoDto>();

            var videos = await _videoRepository.GetAllAsync();

            var searchTerm = request.Query.Trim();

            var results = videos
                .Where(v =>
                    v.Title.Contains(
                        searchTerm,
                        StringComparison.OrdinalIgnoreCase)
                    ||
                    v.Description.Contains(
                        searchTerm,
                        StringComparison.OrdinalIgnoreCase)
                    ||
                    v.Channel.Name.Contains(
                        searchTerm,
                        StringComparison.OrdinalIgnoreCase))
                .OrderByDescending(v => v.UploadedAt)
                .ToList();

            return _mapper.Map<List<VideoDto>>(results);
        }
    }


}
