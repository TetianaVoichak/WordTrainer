using DictionaryCheckApi.Models;
using DictionaryCheckApi.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using DictionaryCheckApi.Repository.IRepository;
using AutoMapper;
using System.Net;

namespace DictionaryCheckApi.Controllers
{
    [Route("api/WordAPI")]
    [ApiController]
    public class WordsAPIController : ControllerBase
    {
        protected APIResponse _response;
        private readonly IWordRepository _dbWord;
        private readonly IMapper _mapper;

        public WordsAPIController(IWordRepository dbWord, IMapper mapper)
        {
            _dbWord = dbWord;
            _mapper = mapper;
           _response = new();
        }
    

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]//The method returns HTTP 200 OK on successful response.

        public async Task<ActionResult<APIResponse>> GetWords()
        {
            try
            {
                //automatically perform data transfer and the correct result will be as a response
                IEnumerable<Word> WordList = await _dbWord.GetAllAsync();
                _response.Result = _mapper.Map<List<WordDTO>>(WordList);
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }

    }
}
