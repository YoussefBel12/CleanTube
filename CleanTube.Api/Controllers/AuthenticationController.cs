using CleanTube.Application.Features.Authentication.Commands.CreateRole;
using CleanTube.Application.Features.Authentication.Commands.Login;
using CleanTube.Application.Features.Authentication.Commands.Register;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CleanTube.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthenticationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(
            RegisterCommand command)
        {
            var userId = await _mediator.Send(command);

            return Ok(userId);
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login(
    LoginCommand command)
        {
            var token = await _mediator.Send(command);

            return Ok(token);
        }


        [HttpPost("roles")]
        public async Task<IActionResult> CreateRole(
    CreateRoleCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }


    }
}
