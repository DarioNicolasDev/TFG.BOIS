using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.OpenAI
{
    public class ParametroOpenAI
    {
        [Key]
        public int ID { get; set; }
        public string Campo { get; set; }
        public string Valor { get; set; }
        public ParametroOpenAI()
        {
            
        }
    }
}
