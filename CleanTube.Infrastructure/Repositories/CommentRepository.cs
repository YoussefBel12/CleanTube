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
    public class CommentRepository : ICommentRepository
    {
        private readonly CleanTubeDbContext _context;

        public CommentRepository(CleanTubeDbContext context)
        {
            _context = context;
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await _context.Comments.FindAsync(id);
        }

        public async Task<IEnumerable<Comment>> GetAllAsync()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task AddAsync(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
        }

        public void Update(Comment comment)
        {
            _context.Comments.Update(comment);
        }

        public void Delete(Comment comment)
        {
            _context.Comments.Remove(comment);
        }


        public async Task<IEnumerable<Comment>> GetByVideoIdAsync(int videoId)
        {
            return await _context.Comments
                .Where(c => c.VideoId == videoId)
                .ToListAsync();
        }

    }

}
