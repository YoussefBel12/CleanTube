using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Domain.Entities;

namespace CleanTube.Application.Interfaces
{
    public interface IVideoRepository
    {
        Task<Video?> GetByIdAsync(int id);
        Task<IEnumerable<Video>> GetAllAsync();
        Task AddAsync(Video video);
        void Update(Video video);
        void Delete(Video video);
    }
}
