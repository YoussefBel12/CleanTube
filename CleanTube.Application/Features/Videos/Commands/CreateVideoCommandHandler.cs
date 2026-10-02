/*
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
        private readonly IVideoFileStorage _videoFileStorage;
        private readonly IUnitOfWork _unitOfWork;

        public CreateVideoCommandHandler(
            IVideoRepository videoRepository,
            IChannelRepository channelRepository,
            IVideoFileStorage videoFileStorage,
            IUnitOfWork unitOfWork)
        {
            _videoRepository = videoRepository;
            _channelRepository = channelRepository;
            _videoFileStorage = videoFileStorage;
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

            var (videoUrl, thumbnailUrl) =
                await _videoFileStorage.SaveAsync(
                    request.VideoFile!,
                    request.ThumbnailFile!,
                    cancellationToken);

            var video = new Video
            {
                Title = request.Title,
                Description = request.Description,
                VideoUrl = videoUrl,
                ThumbnailUrl = thumbnailUrl,
                ChannelId = request.ChannelId,
                UploadedAt = DateTime.UtcNow
            };

            await _videoRepository.AddAsync(video);

            await _unitOfWork.SaveChangesAsync();

            return video.Id;
        }
    }
}
*/


using CleanTube.Application.Interfaces;
using CleanTube.Domain.Entities;
using MediatR;

namespace CleanTube.Application.Features.Videos.Commands;

public class CreateVideoCommandHandler
    : IRequestHandler<CreateVideoCommand, int>
{
    private readonly IVideoRepository _videoRepository;
    private readonly IChannelRepository _channelRepository;
    private readonly IVideoFileStorage _videoFileStorage;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public CreateVideoCommandHandler(
        IVideoRepository videoRepository,
        IChannelRepository channelRepository,
        IVideoFileStorage videoFileStorage,
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _videoRepository = videoRepository;
        _channelRepository = channelRepository;
        _videoFileStorage = videoFileStorage;
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<int> Handle(
        CreateVideoCommand request,
        CancellationToken cancellationToken)
    {
        var userId = _currentUserService.UserId;

        if (string.IsNullOrEmpty(userId))
            throw new UnauthorizedAccessException(
                "User is not authenticated.");

        var channels =
            await _channelRepository.GetByOwnerIdAsync(userId);

        var channel = channels.FirstOrDefault();

        if (channel is null)
            throw new KeyNotFoundException(
                "You do not have a channel yet.");

        var (videoUrl, thumbnailUrl) =
            await _videoFileStorage.SaveAsync(
                request.VideoFile!,
                request.ThumbnailFile!,
                cancellationToken);

        var video = new Video
        {
            Title = request.Title,
            Description = request.Description,
            VideoUrl = videoUrl,
            ThumbnailUrl = thumbnailUrl,
            ChannelId = channel.Id,
            UploadedAt = DateTime.UtcNow
        };

        await _videoRepository.AddAsync(video);

        await _unitOfWork.SaveChangesAsync();

        return video.Id;
    }
}

