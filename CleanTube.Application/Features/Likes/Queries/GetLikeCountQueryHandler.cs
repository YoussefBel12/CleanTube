using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using MediatR;

namespace CleanTube.Application.Features.Likes.Queries
{
    public class GetLikeCountQueryHandler
    : IRequestHandler<GetLikeCountQuery, int>
    {
        private readonly ILikeRepository _likeRepository;

        public GetLikeCountQueryHandler(
            ILikeRepository likeRepository)
        {
            _likeRepository = likeRepository;
        }

        public async Task<int> Handle(
            GetLikeCountQuery request,
            CancellationToken cancellationToken)
        {
            return await _likeRepository.GetLikeCountAsync(
                request.VideoId);
        }
    }
}
