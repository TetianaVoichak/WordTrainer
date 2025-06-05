using System.ComponentModel.DataAnnotations;

namespace DictionaryCheckApi.Models.Dto
{
    public class WordCreateDTO
    {
        [Required] // error if the field is empty
        [MaxLength(30)]
        [RegularExpression(@"^[\p{L}\s\-]+$", ErrorMessage = "Only letters, spaces and hyphens are allowed.")]
        public string TextWord { get; set; }

        [Required] // error if the field is empty
        [RegularExpression(@"^[\p{L}\s\-]+$", ErrorMessage = "Only letters, spaces and hyphens are allowed.")]
        [MaxLength(30)]
        public string Translation { get; set; }

        [RegularExpression(@"^[\p{L}\s\-]+$", ErrorMessage = "Only letters, spaces and hyphens are allowed.")]
        [MaxLength(30)]
        public string Theme { get; set; }
    }
}
