using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using MediatR;

namespace CleanTube.Application.Features.Likes.Queries
{
    public class IsLikedQueryHandler
     : IRequestHandler<IsLikedQuery, bool>
    {
        private readonly ILikeRepository _likeRepository;
        private readonly ICurrentUserService _currentUserService;

        public IsLikedQueryHandler(
            ILikeRepository likeRepository,
            ICurrentUserService currentUserService)
        {
            _likeRepository = likeRepository;
            _currentUserService = currentUserService;
        }

        public async Task<bool> Handle(
            IsLikedQuery request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            if (userId is null)
                throw new UnauthorizedAccessException();

            var like = await _likeRepository.GetByUserAndVideoAsync(
                userId,
                request.VideoId);

            return like is not null;
        }
    }
}
