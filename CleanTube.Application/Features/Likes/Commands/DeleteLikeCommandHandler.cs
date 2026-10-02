using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using MediatR;

namespace CleanTube.Application.Features.Likes.Commands
{
    public class DeleteLikeCommandHandler
    : IRequestHandler<DeleteLikeCommand>
    {
        private readonly ILikeRepository _likeRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICurrentUserService _currentUserService;

        public DeleteLikeCommandHandler(
            ILikeRepository likeRepository,
            IUnitOfWork unitOfWork,
            ICurrentUserService currentUserService)
        {
            _likeRepository = likeRepository;
            _unitOfWork = unitOfWork;
            _currentUserService = currentUserService;
        }

        public async Task Handle(
            DeleteLikeCommand request,
            CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            if (userId is null)
                throw new UnauthorizedAccessException();

            var like = await _likeRepository
                .GetByUserAndVideoAsync(userId, request.VideoId);

            if (like is null)
                return;

            _likeRepository.Delete(like);

            await _unitOfWork.SaveChangesAsync();
        }
    }
}
