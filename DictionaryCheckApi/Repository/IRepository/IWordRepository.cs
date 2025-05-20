using DictionaryCheckApi.Models;
namespace DictionaryCheckApi.Repository.IRepository
{
    public interface IWordRepository :IRepository<Word>
    {
        Task<Word> UpdateAsync(Word entity);
    }
}
