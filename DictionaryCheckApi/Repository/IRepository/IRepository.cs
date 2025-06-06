﻿using System.Linq.Expressions;

namespace DictionaryCheckApi.Repository.IRepository
{
    //universal interface for repository
    public interface IRepository<T> where T : class
    {
        Task<List<T>> GetAllAsync(Expression<Func<T, bool>> filter = null);
        Task<T> GetAsync(Expression<Func<T, bool>> filter = null, bool tracked = true);
        Task CreateAsync(T entity);
        Task RemoveAsync(T entity);
        Task SaveAsync();

        Task<T> GetRandomAsync(); //a method that returns a random word
    }
}
