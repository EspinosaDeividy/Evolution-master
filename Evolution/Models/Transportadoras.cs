using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Evolution.Models {

    [Table("Transportadora")]
    public class Transportadoras {

        [Key]
        [Column("TransportadoraID")]
        [Index("TransportadoraID", 1, IsUnique = true)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TransportadoraID { get; set; }

        [StringLength(100)]
        [Required]
        public string NomeRazaoSocial { get; set; }

        [StringLength(250)]
        public string Endereco { get; set; }

        public int numero { get; set; }

        [StringLength(100)]
        public string Bairro { get; set; }

        [StringLength(100)]
        public string Cidade { get; set; }

        [StringLength(100)]
        public string Estado { get; set; }

        [ForeignKey("Usuario")]
        [Index("UsuarioID", 2, IsUnique = true)]
        public int UsuarioID { get; set; }

        public Usuario Usuario { get; set; }
                    
        [ForeignKey("Classificacao")]
        public int ClassificacaoID { get; set; }

        public Classificacao Classificacao { get; set; }

    }
}