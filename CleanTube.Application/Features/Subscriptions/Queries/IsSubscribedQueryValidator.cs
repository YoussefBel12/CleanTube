using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace CleanTube.Application.Features.Subscriptions.Queries
{
    public class IsSubscribedQueryValidator
     : AbstractValidator<IsSubscribedQuery>
    {
        public IsSubscribedQueryValidator()
        {
            RuleFor(x => x.ChannelId)
                .GreaterThan(0);
        }
    }
}
