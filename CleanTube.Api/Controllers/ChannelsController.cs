using CleanTube.Application.Features.Channels.Commands;
using CleanTube.Application.Features.Channels.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CleanTube.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChannelsController : ControllerBase
    {

        private readonly IMediator _mediator;

        public ChannelsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        // [Authorize(Roles = "Admin")]
        [Authorize]
        public async Task<IActionResult> Create(
            CreateChannelCommand command)
        {
            var channelId = await _mediator.Send(command);

            return Ok(channelId);
        }



        [HttpGet("my")]
        [Authorize]
        public async Task<IActionResult> GetMyChannels()
        {
            var channels = await _mediator.Send(
                new GetMyChannelsQuery());

            return Ok(channels);
        }


        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(int id)
        {
            var channel = await _mediator.Send(
                new GetChannelByIdQuery
                {
                    Id = id
                });

            if (channel is null)
                return NotFound();

            return Ok(channel);
        }


    }
}
