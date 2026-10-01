using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Domain.Entities;

namespace CleanTube.Application.Interfaces
{
    public interface ICommentRepository
    {
        Task<Comment?> GetByIdAsync(int id);

        Task<IEnumerable<Comment>> GetAllAsync();

        Task<IEnumerable<Comment>> GetByVideoIdAsync(int videoId);

        Task AddAsync(Comment comment);

        void Update(Comment comment);

        void Delete(Comment comment);
    }
}
