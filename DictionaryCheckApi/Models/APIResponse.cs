using System.Net;

namespace DictionaryCheckApi.Models
{
    /// <summary>
    ///  Represents a standard format for API responses,
    ///  including status, success flag, errors, and result data.
    /// </summary>
    public class APIResponse
    {
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess { get; set; } = true;
        public List<string> ErrorMessages { get; set; } = new List<string>();
        public object Result { get; set; }
    }
}
