namespace DictionaryCheckApi.Models.Dto
{

    public class TranslationCheckResponseDto
    {
        public bool Correct { get; set; } = false;
        public string? Message { get; set; } = null;
        public string? CorrectTranslation { get; set; } = null;
    }
}
