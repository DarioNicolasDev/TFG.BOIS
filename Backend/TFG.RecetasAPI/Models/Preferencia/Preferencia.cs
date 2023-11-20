using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Preferencia
{
    public class Preferencia
    {
        [Key]
        public int ID { get; set; }
        public string NombrePreferencia { get; set; }
        public string DescripcionPreferencia { get; set; }
        public int TipoPreferenciaID { get; set; }

        public TipoPreferencia? TipoPreferencia { get; set; }
    }
}
