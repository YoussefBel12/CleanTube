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
    public class ChannelRepository : IChannelRepository
    {

        private readonly CleanTubeDbContext _context;

        public ChannelRepository(CleanTubeDbContext context)
        {
            _context = context;
        }

        public async Task<Channel?> GetByIdAsync(int id)
        {
            return await _context.Channels.FindAsync(id);
        }

        public async Task<IEnumerable<Channel>> GetAllAsync()
        {
            return await _context.Channels.ToListAsync();
        }

        public async Task AddAsync(Channel channel)
        {
            await _context.Channels.AddAsync(channel);
        }

        public void Update(Channel channel)
        {
            _context.Channels.Update(channel);
        }

        public void Delete(Channel channel)
        {
            _context.Channels.Remove(channel);
        }

        public async Task<IEnumerable<Channel>> GetByOwnerIdAsync(
    string ownerId)
        {
            return await _context.Channels
                .Where(x => x.OwnerId == ownerId)
                .ToListAsync();
        }


    }
}
