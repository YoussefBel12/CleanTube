using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using CleanTube.Domain.Entities;
using MediatR;

namespace CleanTube.Application.Features.Comments.Commands
{
    public class CreateCommentCommandHandler
    : IRequestHandler<CreateCommentCommand, int>
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IVideoRepository _videoRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;

        public CreateCommentCommandHandler(
            ICommentRepository commentRepository,
            IVideoRepository videoRepository,
            IUnitOfWork unitOfWork,
            ICurrentUserService currentUserService)
        {
            _commentRepository = commentRepository;
            _videoRepository = videoRepository;
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        public async Task<int> Handle(
            CreateCommentCommand request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            if (userId is null)
                throw new UnauthorizedAccessException();

            var video = await _videoRepository.GetByIdAsync(
                request.VideoId);

            if (video is null)
                throw new KeyNotFoundException("Video not found.");

            var comment = new Comment
            {
                Content = request.Content,
                VideoId = request.VideoId,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            await _commentRepository.AddAsync(comment);

            await _unitOfWork.SaveChangesAsync();

            return comment.Id;
        }
    }
}
