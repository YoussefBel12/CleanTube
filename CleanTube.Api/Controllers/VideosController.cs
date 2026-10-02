using CleanTube.Application.Features.Videos.Commands;
using CleanTube.Application.Features.Videos.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CleanTube.Api.Controllers
{
   
    [ApiController]
    [Route("api/[controller]")]
    public class VideosController : ControllerBase
    {
        private readonly IMediator _mediator;

        public VideosController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(
            [FromForm] CreateVideoCommand command)
        {
            var videoId = await _mediator.Send(command);

            return Ok(videoId);
        }





        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var video = await _mediator.Send(
                new GetVideoByIdQuery { Id = id });

            if (video is null)
                return NotFound();

            return Ok(video);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var videos = await _mediator.Send(
                new GetAllVideosQuery());

            return Ok(videos);
        }



    }
}
