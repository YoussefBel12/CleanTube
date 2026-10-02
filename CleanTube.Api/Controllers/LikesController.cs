using CleanTube.Application.Features.Likes.Commands;
using CleanTube.Application.Features.Likes.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CleanTube.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class LikesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LikesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Like(
            CreateLikeCommand command)
        {
            var likeId = await _mediator.Send(command);

            return Ok(likeId);
        }

        [HttpDelete("{videoId}")]
        public async Task<IActionResult> Unlike(int videoId)
        {
            await _mediator.Send(
                new DeleteLikeCommand
                {
                    VideoId = videoId
                });

            return NoContent();
        }



        [HttpGet("video/{videoId}/count")]
        [AllowAnonymous]
        public async Task<IActionResult> GetLikeCount(int videoId)
        {
            var count = await _mediator.Send(
                new GetLikeCountQuery
                {
                    VideoId = videoId
                });

            return Ok(count);
        }


        [HttpGet("video/{videoId}")]
        public async Task<IActionResult> IsLiked(int videoId)
        {
            var result = await _mediator.Send(
                new IsLikedQuery
                {
                    VideoId = videoId
                });

            return Ok(result);
        }


    }
}
