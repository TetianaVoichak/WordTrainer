using System.ComponentModel.DataAnnotations;
namespace DictionaryCheckApi.Models.Dto
{
    public class TranslationWordDTO
    {
        [Required(ErrorMessage = "Word is required")]
        [RegularExpression(@"^[\p{L}\s\-]+$", ErrorMessage = "Only letters, spaces and hyphens are allowed.")]

        [StringLength(30, ErrorMessage = "Maximum translation length is 30 characters")]
        public string TextWord { get; set; }

        [Required(ErrorMessage = "Translation is required")]
        [RegularExpression(@"^[\p{L}\s\-]+$", ErrorMessage = "Only letters, spaces and hyphens are allowed.")]
        [StringLength(30, ErrorMessage = "Maximum translation length is 30 characters")]
        public string Translation { get; set; }
    }
}
