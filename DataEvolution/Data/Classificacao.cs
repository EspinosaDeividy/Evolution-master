using System;
using System.Collections.Generic;
using System.Linq;

namespace DataEvolution.Data {
    public class Classificacao {

        public static List<Models.Classificacao> GetListClassificacao() {
            try {
                using (var db = new dbContext()) {
                    return db.Classificacao.ToList();
                }
            }
            catch (Exception) {
                throw new Exception("Erro!");
            }
        }
    }
}
