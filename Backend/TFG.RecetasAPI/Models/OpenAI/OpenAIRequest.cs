using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.OpenAI
{
    public class OpenAIRequest
    {
        public string model { get; set; }
        public List<OpenAIRequestMessage> messages { get; set; }

        public OpenAIRequest()
        {
            messages = new List<OpenAIRequestMessage>();
        }
    }

    public class OpenAIRequestMessage
    {
        public string role { get; set; }
        public string content { get; set; }
    }
}
