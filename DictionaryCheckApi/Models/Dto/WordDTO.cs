using System.ComponentModel.DataAnnotations;
namespace DictionaryCheckApi.Models.Dto
{
    public class WordDTO
    {
        public int Id { get; set; }
        [Required] // error if the field is empty
        [RegularExpression(@"^[\p{L}\s\-]+$", ErrorMessage = "Only letters, spaces and hyphens are allowed.")]
        [MaxLength(30)]
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
