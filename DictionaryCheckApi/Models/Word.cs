using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DictionaryCheckApi.Models
{
    public class Word
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // for automatic assignment in the id database
        public int Id { get; set; }
        public string TextWord { get; set; }
        public string Translation { get; set; }
        public string Theme { get; set; }

    }
}
