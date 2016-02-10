using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Evolution.Models;

namespace Evolution.Controllers {
    public class ClassificacaoController : Controller {
        private BancoTransportadoras db = new BancoTransportadoras();

        public ActionResult Index() {
            return View(db.Classificacao.ToList());
        }

        public ActionResult Create() {
            return View();
        }



        [HttpGet]
        public ActionResult Listar() {
            var listaClassificacoes = db.Classificacao.ToList();
            return Json(listaClassificacoes, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(Classificacao classificacao) {

            try {
                var listClassificacao = db.Classificacao.ToList();

                if (listClassificacao.Count > 0) {
                    if (listClassificacao.Exists(u => u.Descricao == classificacao.Descricao)) {
                        return Json(false);
                    }
                }
                db.Classificacao.Add(classificacao);
                db.SaveChanges();
            }
            catch (Exception) {

                throw;
            }
            return Json(true);
        }

        [HttpPost]
        public void Atualizar(Classificacao classificacao) {
            try {
                db.Entry(classificacao).State = EntityState.Modified;
                db.SaveChanges();
            }
            catch (Exception) {

                throw;
            }
        }

        [HttpGet]
        public ActionResult Edit(int? id) {
            try {
                if (id == null) {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                Classificacao classificacao = db.Classificacao.Find(id);

                if (classificacao == null) {
                    return HttpNotFound();
                }
                return Json(classificacao, JsonRequestBehavior.AllowGet);
            }
            catch (Exception) {
                throw;
            }
        }

        [HttpPost]
        public void Delete(int? id) {
            try {
                Classificacao classificacao = db.Classificacao.Find(id);
                db.Classificacao.Remove(classificacao);
                db.SaveChanges();
            }
            catch (Exception) {

                throw;
            }
        }

        protected override void Dispose(bool disposing) {
            if (disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
