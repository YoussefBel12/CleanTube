using CleanTube.Application.Features.Comments.Commands;
using CleanTube.Application.Features.Comments.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CleanTube.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CommentsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(
            CreateCommentCommand command)
        {
            var commentId = await _mediator.Send(command);

            return Ok(commentId);
        }


        [HttpGet("video/{videoId}")]
        public async Task<IActionResult> GetByVideo(int videoId)
        {
            var comments = await _mediator.Send(
                new GetCommentsByVideoQuery
                {
                    VideoId = videoId
                });

            return Ok(comments);
        }







    }
}
