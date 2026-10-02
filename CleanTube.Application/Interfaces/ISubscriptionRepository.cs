using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Domain.Entities;

namespace CleanTube.Application.Interfaces
{
    public interface ISubscriptionRepository
    {
        Task<Subscription?> GetByIdAsync(int id);

        Task<Subscription?> GetByUserAndChannelAsync(
            string userId,
            int channelId);

        Task<IEnumerable<Subscription>> GetByChannelIdAsync(
            int channelId);

        Task<IEnumerable<Subscription>> GetByUserIdAsync(
            string userId);

        Task AddAsync(Subscription subscription);

        void Delete(Subscription subscription);
    }
}
