using DictionaryCheckApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;


namespace DictionaryCheckApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options)
        {

        }
        public DbSet<Word> Words { get; set; }

       
    }
}
