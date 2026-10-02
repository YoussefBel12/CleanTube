using CleanTube.Application.Features.Subscriptions.Commands;
using CleanTube.Application.Features.Subscriptions.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CleanTube.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SubscriptionsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SubscriptionsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Subscribe(
            CreateSubscriptionCommand command)
        {
            var subscriptionId = await _mediator.Send(command);

            return Ok(subscriptionId);
        }

        [HttpDelete("{channelId}")]
        public async Task<IActionResult> Unsubscribe(int channelId)
        {
            await _mediator.Send(
                new DeleteSubscriptionCommand
                {
                    ChannelId = channelId
                });

            return NoContent();
        }

        [HttpGet("channel/{channelId}")]
        public async Task<IActionResult> IsSubscribed(int channelId)
        {
            var result = await _mediator.Send(
                new IsSubscribedQuery
                {
                    ChannelId = channelId
                });

            return Ok(result);
        }



        [HttpGet("channel/{channelId}/count")]
        [AllowAnonymous]
        public async Task<IActionResult> GetSubscriberCount(int channelId)
        {
            var count = await _mediator.Send(
                new GetSubscriberCountQuery
                {
                    ChannelId = channelId
                });

            return Ok(count);
        }





    }
}
