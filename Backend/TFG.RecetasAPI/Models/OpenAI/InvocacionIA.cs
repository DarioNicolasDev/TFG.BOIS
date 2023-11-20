using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.OpenAI
{
    public class InvocacionIA
    {
        [Key]
        public int ID { get; set; }
        public string RespuestaIA { get; set; }
        public string PeticionIA { get; set; }
        public DateTime FechaHoraPeticion { get; set; }
        public DateTime? FechaHoraRespuesta { get; set; }
        public InvocacionIA()
        {
                
        }
    }
}
