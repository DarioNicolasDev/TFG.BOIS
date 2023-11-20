using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Receta
{
    public class RecetaPasos
    {
        [Key]
        public int ID { get; set; }
        public int RecetaID { get; set; }
        public int NumeroPaso { get; set; }
        public string TituloPaso { get; set; }
        public string DescripcionPaso { get; set; }
        public string ImagenPasoURL { get; set; }
        public decimal TiempoDeRealizacion { get; set; }
    }
}
