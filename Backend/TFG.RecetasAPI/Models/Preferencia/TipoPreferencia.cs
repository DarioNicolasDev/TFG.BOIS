using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Preferencia
{
    public class TipoPreferencia
    {
        [Key]
        public int ID { get; set; }
        public string NombreTipoPreferencia { get; set; }
        public string DescripcionTipoPreferencia { get; set; }
    }
}
