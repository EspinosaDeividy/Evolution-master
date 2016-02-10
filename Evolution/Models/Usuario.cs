using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Evolution.Models {

    [Table("Usuario")]
    public class Usuario {

        [Column("UsuarioID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UsuarioID { get; set; }
        [Required]
        public string Nome { get; set; }
    }
}