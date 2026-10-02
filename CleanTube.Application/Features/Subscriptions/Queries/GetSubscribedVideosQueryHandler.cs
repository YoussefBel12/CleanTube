using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CleanTube.Application.Dtos.Videos;
using CleanTube.Application.Interfaces;
using MediatR;

namespace CleanTube.Application.Features.Subscriptions.Queries
{
    public class GetSubscribedVideosQueryHandler : IRequestHandler<GetSubscribedVideosQuery, IEnumerable<VideoDto>> { private readonly ISubscriptionRepository _subscriptionRepository; private readonly IVideoRepository _videoRepository; private readonly ICurrentUserService _currentUserService; private readonly IMapper _mapper; public GetSubscribedVideosQueryHandler(ISubscriptionRepository subscriptionRepository, IVideoRepository videoRepository, ICurrentUserService currentUserService, IMapper mapper) { _subscriptionRepository = subscriptionRepository; _videoRepository = videoRepository; _currentUserService = currentUserService; _mapper = mapper; } public async Task<IEnumerable<VideoDto>> Handle(GetSubscribedVideosQuery request, CancellationToken cancellationToken) { var userId = _currentUserService.UserId; if (string.IsNullOrEmpty(userId)) return Enumerable.Empty<VideoDto>(); var subscriptions = await _subscriptionRepository.GetByUserIdAsync(userId); var channelIds = subscriptions.Select(s => s.ChannelId).ToList(); if (channelIds.Count == 0) return Enumerable.Empty<VideoDto>(); var allVideos = await _videoRepository.GetAllAsync(); var videos = allVideos.Where(v => channelIds.Contains(v.ChannelId)).OrderByDescending(v => v.UploadedAt).ToList(); return _mapper.Map<List<VideoDto>>(videos); } }
}
