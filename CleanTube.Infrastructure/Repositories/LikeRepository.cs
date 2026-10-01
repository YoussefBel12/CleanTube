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
    public class LikeRepository : ILikeRepository
    {
        private readonly CleanTubeDbContext _context;

        public LikeRepository(CleanTubeDbContext context)
        {
            _context = context;
        }

        public async Task<Like?> GetByIdAsync(int id)
        {
            return await _context.Set<Like>()
                .FindAsync(id);
        }

        public async Task<Like?> GetByUserAndVideoAsync(
            string userId,
            int videoId)
        {
            return await _context.Set<Like>()
                .FirstOrDefaultAsync(x =>
                    x.UserId == userId &&
                    x.VideoId == videoId);
        }

        public async Task AddAsync(Like like)
        {
            await _context.Set<Like>().AddAsync(like);
        }

        public void Delete(Like like)
        {
            _context.Set<Like>().Remove(like);
        }
    }
}
