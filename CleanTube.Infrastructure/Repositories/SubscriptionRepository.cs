using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using CleanTube.Domain.Entities;
using CleanTube.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CleanTube.Infrastructure.Repositories
{
    public class SubscriptionRepository : ISubscriptionRepository
    {
        private readonly CleanTubeDbContext _context;

        public SubscriptionRepository(CleanTubeDbContext context)
        {
            _context = context;
        }

        public async Task<Subscription?> GetByIdAsync(int id)
        {
            return await _context.Set<Subscription>()
                .FindAsync(id);
        }

        public async Task<Subscription?> GetByUserAndChannelAsync(
            string userId,
            int channelId)
        {
            return await _context.Set<Subscription>()
                .FirstOrDefaultAsync(x =>
                    x.UserId == userId &&
                    x.ChannelId == channelId);
        }

        public async Task AddAsync(Subscription subscription)
        {
            await _context.Set<Subscription>()
                .AddAsync(subscription);
        }

        public void Delete(Subscription subscription)
        {
            _context.Set<Subscription>()
                .Remove(subscription);
        }


        public async Task<IEnumerable<Subscription>> GetByChannelIdAsync(
    int channelId)
        {
            return await _context.Set<Subscription>()
                .Where(x => x.ChannelId == channelId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Subscription>> GetByUserIdAsync(
            string userId)
        {
            return await _context.Set<Subscription>()
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

    }
}
