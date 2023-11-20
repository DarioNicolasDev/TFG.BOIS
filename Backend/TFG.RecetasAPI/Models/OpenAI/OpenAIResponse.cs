using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models.OpenAI
{
    public class OpenAIResponse
    {
        public string id { get; set; }
        [JsonPropertyName("object")]
        public string objectProperty { get; set; }
        public long created { get; set; }
        public string model { get; set; }

        public List<OpenAIResponseChoise> choices { get; set; }

        public OpenAIResponseUsage usage { get; set; }
    }

    public class OpenAIResponseUsage
    {
        public int prompt_tokens { get; set; }
        public int completion_tokens { get; set; }
        public int total_tokens { get; set; }
    }

    public class OpenAIResponseChoise
    {
        public int index { get; set; }
        public OpenAIRequestMessage message { get; set; }
        public string finish_reason { get; set; }
    }
}
