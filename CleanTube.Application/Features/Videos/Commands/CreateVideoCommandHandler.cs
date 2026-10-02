using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using CleanTube.Domain.Entities;
using MediatR;

namespace CleanTube.Application.Features.Videos.Commands
{
    public class CreateVideoCommandHandler
    : IRequestHandler<CreateVideoCommand, int>
    {
        private readonly IVideoRepository _videoRepository;
        private readonly IChannelRepository _channelRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CreateVideoCommandHandler(
            IVideoRepository videoRepository,
            IChannelRepository channelRepository,
            IUnitOfWork unitOfWork)
        {
            _videoRepository = videoRepository;
            _channelRepository = channelRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<int> Handle(
            CreateVideoCommand request,
            CancellationToken cancellationToken)
        {
            var channel = await _channelRepository.GetByIdAsync(
                request.ChannelId);

            if (channel is null)
                throw new KeyNotFoundException("Channel not found.");

            var video = new Video
            {
                Title = request.Title,
                Description = request.Description,
                VideoUrl = request.VideoUrl,
                ThumbnailUrl = request.ThumbnailUrl,
                ChannelId = request.ChannelId,
                UploadedAt = DateTime.UtcNow
            };

            await _videoRepository.AddAsync(video);

            await _unitOfWork.SaveChangesAsync();

            return video.Id;
        }
    }
}
