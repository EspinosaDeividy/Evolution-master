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
    public class TransportadorasController : Controller {

        private readonly BancoTransportadoras db = new BancoTransportadoras();



        public ActionResult ProgressBar() {
            return View();
        }

        public ActionResult Index() {

            var listUsuarios = db.Usuarios.ToList();
            var listClassificacoes = db.Classificacao.ToList();

            if (listUsuarios.Count <= 0 || listClassificacoes.Count <= 0) {
                TempData["Message"] = "Para iniciar o cadastro de transportadora é necessario completar os cadastros de usuários e classificações, Obrigado.";
                return Redirect("Home/Index");
            }

            ViewBag.ClassificacaoId = new SelectList
            (
                db.Classificacao.ToList(),
                "ClassificacaoID",
                "Descricao"
            );

            ViewBag.UsuarioId = new SelectList
            (
                db.Usuarios.ToList(),
                "UsuarioID",
                "Nome"
            );
        
            return View(db.Transportadoras.ToList());
        }

        public ActionResult Create() {
            return View();
        }

        [HttpGet]
        public ActionResult Listar() {
            var listaTransportadoras = db.Transportadoras.ToList();
            return Json(listaTransportadoras, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ViewResult SearchList() {
            var carrierList = db.Transportadoras.ToList();
            return View("List", carrierList);
        }

        [HttpGet]
        public JsonResult SearchListJson(string carrierName) {
            try {
                var carrierList = db.Transportadoras.ToList();
                return Json(carrierList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception) {
                throw;
            }
        }


        [HttpPost]
        public JsonResult Create(Transportadoras transportadoras) {

            try {

                var listTransportadoras = db.Transportadoras.ToList();

                if (listTransportadoras.Exists(t => t.UsuarioID == transportadoras.UsuarioID)) {
                    return Json("false");
                }

                if (listTransportadoras.Exists(t => t.NomeRazaoSocial == transportadoras.NomeRazaoSocial)) {
                    return Json("exists");
                }

                db.Transportadoras.Add(transportadoras);
                db.SaveChanges();
            }
            catch (Exception) {
                throw;
            }
            return Json("true");
        }

        [HttpPost]
        public void Atualizar(Transportadoras transportadoras) {
            try {
                db.Entry(transportadoras).State = EntityState.Modified;
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
                Transportadoras transportadoras = db.Transportadoras.Find(id);

                if (transportadoras == null) {
                    return HttpNotFound();
                }
                return Json(transportadoras, JsonRequestBehavior.AllowGet);
            }
            catch (Exception) {
                throw;
            }
        }

        [HttpPost]
        public void Delete(int? id) {
            try {
                Transportadoras transportadoras = db.Transportadoras.Find(id);
                db.Transportadoras.Remove(transportadoras);
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
