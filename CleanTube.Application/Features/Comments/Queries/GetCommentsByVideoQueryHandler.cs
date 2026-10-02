using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CleanTube.Application.Dtos.Comments;
using CleanTube.Application.Interfaces;
using MediatR;

namespace CleanTube.Application.Features.Comments.Queries
{
    public class GetCommentsByVideoQueryHandler
        : IRequestHandler<GetCommentsByVideoQuery, IEnumerable<CommentDto>>
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;
        private readonly IIdentityService _identityService;

        public GetCommentsByVideoQueryHandler(
            ICommentRepository commentRepository,
            IMapper mapper,
            IIdentityService identityService)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
            _identityService = identityService;
        }

        public async Task<IEnumerable<CommentDto>> Handle(
            GetCommentsByVideoQuery request,
            CancellationToken cancellationToken)
        {
            var comments = await _commentRepository.GetByVideoIdAsync(
                request.VideoId);

            var commentDtos = _mapper.Map<List<CommentDto>>(comments);

            foreach (var commentDto in commentDtos)
            {
                commentDto.UserName =
                    await _identityService.GetUserNameAsync(
                        commentDto.UserId);
            }

            return commentDtos;
        }
    }
}

