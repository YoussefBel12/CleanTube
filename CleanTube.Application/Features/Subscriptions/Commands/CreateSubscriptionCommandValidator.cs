using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace CleanTube.Application.Features.Subscriptions.Commands
{
    public class CreateSubscriptionCommandValidator
    : AbstractValidator<CreateSubscriptionCommand>
    {
        public CreateSubscriptionCommandValidator()
        {
            RuleFor(x => x.ChannelId)
                .GreaterThan(0);
        }
    }
}
