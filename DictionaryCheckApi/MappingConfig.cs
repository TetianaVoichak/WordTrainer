using DictionaryCheckApi.Models;
using DictionaryCheckApi.Models.Dto;
using AutoMapper;

namespace DictionaryCheckApi
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {

            //transfer data from an object of type Word to an object of type WordDTO
            CreateMap<Word, WordDTO>();
            CreateMap<WordDTO, Word>();

            //transfer and inverse 
            CreateMap<Word, WordCreateDTO>().ReverseMap();
            CreateMap<Word, WordUpdateDTO>().ReverseMap();
        }
    }
}
