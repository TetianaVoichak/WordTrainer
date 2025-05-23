using System.ComponentModel.DataAnnotations;

namespace DictionaryCheckApi.Models.Dto
{
    public class WordUpdateDTO
    {
        [Required]
        public int Id { get; set; }
        [Required] // error if the field is empty
        [MaxLength(30)]
        public string TextWord { get; set; }

        [Required] // error if the field is empty
        [MaxLength(30)]
        public string Translation { get; set; }
        public string Theme { get; set; }
    }
}
