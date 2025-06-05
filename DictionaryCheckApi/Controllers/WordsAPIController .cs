using DictionaryCheckApi.Models;
using DictionaryCheckApi.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using DictionaryCheckApi.Repository.IRepository;
using AutoMapper;
using System.Net;
using DictionaryCheckApi.Data;
using Microsoft.EntityFrameworkCore;
using System;
using Azure;

namespace DictionaryCheckApi.Controllers
{
    [Route("api/WordAPI")]
    [ApiController]
    public class WordsAPIController : ControllerBase
    {
        protected APIResponse _response;
        private readonly IRepository<Word> _dbWordI;
        private readonly ApplicationDbContext _dbWord;
        private readonly IMapper _mapper;

        public WordsAPIController(ApplicationDbContext dbWord, IMapper mapper, IRepository<Word> dbWordI)
        {
            _dbWord = dbWord;
            _dbWordI = dbWordI;
            _mapper = mapper;
            _response = new();
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)] //The method returns HTTP 200 OK on successful response.

        public async Task<ActionResult<APIResponse>> GetWordTranslate()
        {
            try
            {
                var randomWord = await _dbWordI.GetRandomAsync();

                _response.Result = _mapper.Map<WordDTO>(randomWord);
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
        [HttpGet("{id:int}", Name = "GetWord")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<APIResponse>> GetWord(int id)
        {
            try
            {
                if (id == 0)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return BadRequest(_response);
                }

                var word = await _dbWordI.GetAsync(u => u.Id == id);

                if (word == null)
                {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    return NotFound(_response);
                }

                _response.Result = _mapper.Map<WordDTO>(word);
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
        [HttpPost("check")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> CheckWordTranslate([FromBody] TranslationWordDTO checkTranslateDTO)
        {
            try
            {
                //It checks whether the input data that came into the model (DTO) is correct,
                //taking into account the validation rules (for example, [Required], [StringLength], etc.)

                if (!ModelState.IsValid)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    _response.ErrorMessages = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                        .ToList();
                    return BadRequest(_response);
                }

                var word = await _dbWordI.GetAsync(w => w.Translation.ToLower() == checkTranslateDTO.Translation.ToLower());

                //If there is no such word in the database, then 404 Not Found.
                if (word == null)
                {
                    _response.IsSuccess = false;
                    _response.StatusCode = HttpStatusCode.NotFound;
                    _response.ErrorMessages.Add("Wrong.Word not found.");
                    return NotFound(_response);
                }

                bool isCorrect = word.TextWord.Equals(checkTranslateDTO.TextWord, StringComparison.OrdinalIgnoreCase);

                var response = new TranslationCheckResponseDto
                {
                    Correct = isCorrect,
                    Message = isCorrect ? "RIGHT" : "WRONG",
                    CorrectTranslation = word.Translation
                };

                _response.Result = response;
                _response.StatusCode = HttpStatusCode.OK;
                _response.IsSuccess = true;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                return StatusCode(500, _response);
            }
        }

        [HttpPost("add")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> CreateVillaNumber([FromBody] WordCreateDTO createDTO)
        {
            try
            {
                if (createDTO == null)
                {
                    return BadRequest(createDTO);
                }

                //automatic data transfer process
                Word word = _mapper.Map<Word>(createDTO);

                await _dbWordI.CreateAsync(word);

                _response.Result = _mapper.Map<Word>(word);
                _response.StatusCode = HttpStatusCode.Created;
                return CreatedAtRoute("GetWord", new { id = word.Id }, _response);
            }
            catch(Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
            }
            return _response;
        }
    }
 }

