using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Preferencia;

namespace Models.Receta
{
    public class RecetaPreferencia
    {
        [Key]
        public int ID { get; set; }
        public int RecetaID { get; set; }
        public int PreferenciaID { get; set; }

        public Preferencia.Preferencia Preferencia { get; set; }
    }
}
