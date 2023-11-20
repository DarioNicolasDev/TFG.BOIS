using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Usuario;

namespace Models.Autenticacion
{
    public class Autentincacion
    {
        public Usuario.Usuario Usuario { get; set; }
        public string Token { get; set; }
        public DateTime  TokenExpiration { get; set; }

    }
}
