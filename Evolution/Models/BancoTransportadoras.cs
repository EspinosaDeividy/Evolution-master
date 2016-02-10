using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Evolution.Models {
    public class BancoTransportadoras : DbContext {

        public DbSet<Transportadoras> Transportadoras { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Classificacao> Classificacao { get; set; }
    }
}