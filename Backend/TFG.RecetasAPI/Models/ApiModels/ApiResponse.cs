using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.ApiModels
{
    public class ApiResponse<T> where T : class
    {
        public List<T>? Data { get; set; }
        public string Detail { get; set; }
        public int StatusCode { get; set; }
        public ApiResponse()
        {
            Data = new List<T>();
        }
    }
}
