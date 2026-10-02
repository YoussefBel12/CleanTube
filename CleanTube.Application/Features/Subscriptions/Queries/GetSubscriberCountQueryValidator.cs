using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace CleanTube.Application.Features.Subscriptions.Queries
{
    public class GetSubscriberCountQueryValidator
    : AbstractValidator<GetSubscriberCountQuery>
    {
        public GetSubscriberCountQueryValidator()
        {
            RuleFor(x => x.ChannelId)
                .GreaterThan(0);
        }
    }
}
