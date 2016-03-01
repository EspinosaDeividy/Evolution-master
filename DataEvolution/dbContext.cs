using System.Data.Entity;
using DataEvolution.Models;

namespace DataEvolution {
    public class dbContext : DbContext {

        public DbSet<Transportadoras> Transportadoras { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Classificacao> Classificacao { get; set; }
    }
}
