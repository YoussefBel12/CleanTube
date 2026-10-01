using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;

namespace CleanTube.Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly CleanTubeDbContext _context;

        public UnitOfWork(CleanTubeDbContext context)
        {
            _context = context;
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
