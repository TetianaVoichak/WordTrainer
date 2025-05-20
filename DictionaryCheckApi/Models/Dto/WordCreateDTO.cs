using System.ComponentModel.DataAnnotations;

namespace DictionaryCheckApi.Models.Dto
{
    public class WordCreateDTO
    {
        [Required] // error if the field is empty
        [MaxLength(30)]
        public string Text { get; set; }

        [Required] // error if the field is empty
        [MaxLength(30)]
        public string Translation { get; set; }
        public string Theme { get; set; }
    }
}
