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
    public class VideoRepository : IVideoRepository
    {
        private readonly CleanTubeDbContext _context;

        public VideoRepository(CleanTubeDbContext context)
        {
            _context = context;
        }

        public async Task<Video?> GetByIdAsync(int id)
        {
            return await _context.Videos.FindAsync(id);
        }

        public async Task<IEnumerable<Video>> GetAllAsync()
        {
            return await _context.Videos.ToListAsync();
        }

        public async Task AddAsync(Video video)
        {
            await _context.Videos.AddAsync(video);
        }

        public void Update(Video video)
        {
            _context.Videos.Update(video);
        }

        public void Delete(Video video)
        {
            _context.Videos.Remove(video);
        }
    }
}
