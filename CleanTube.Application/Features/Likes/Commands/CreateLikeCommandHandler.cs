using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using CleanTube.Domain.Entities;
using MediatR;

namespace CleanTube.Application.Features.Likes.Commands
{
    public class CreateLikeCommandHandler
    : IRequestHandler<CreateLikeCommand, int>
    {
        private readonly ILikeRepository _likeRepository;
        private readonly IVideoRepository _videoRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;

        public CreateLikeCommandHandler(
            ILikeRepository likeRepository,
            IVideoRepository videoRepository,
            IUnitOfWork unitOfWork,
            ICurrentUserService currentUserService)
        {
            _likeRepository = likeRepository;
            _videoRepository = videoRepository;
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        public async Task<int> Handle(
            CreateLikeCommand request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            if (userId is null)
                throw new UnauthorizedAccessException();

            var video = await _videoRepository.GetByIdAsync(
                request.VideoId);

            if (video is null)
                throw new KeyNotFoundException("Video not found.");

            var existingLike =
                await _likeRepository.GetByUserAndVideoAsync(
                    userId,
                    request.VideoId);

            if (existingLike is not null)
                return existingLike.Id;

            var like = new Like
            {
                UserId = userId,
                VideoId = request.VideoId,
                CreatedAt = DateTime.UtcNow
            };

            await _likeRepository.AddAsync(like);

            await _unitOfWork.SaveChangesAsync();

            return like.Id;
        }
    }
}
