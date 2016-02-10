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
    public class UsuariosController : Controller {
        private BancoTransportadoras db = new BancoTransportadoras();

        public ActionResult Index() {
            return View(db.Usuarios.ToList());
        }

        public ActionResult Create() {
            return View();
        }

        [HttpGet]
        public ActionResult Listar() {
            var listaUsuarios = db.Usuarios.ToList();
            return Json(listaUsuarios, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(Usuario usuario) {

            try {

                var listUsuarios = db.Usuarios.ToList();

                if (listUsuarios.Count > 0) { 
                   if(listUsuarios.Exists(u => u.Nome == usuario.Nome)){
                    return Json(false);
                   }
                }

                db.Usuarios.Add(usuario);
                db.SaveChanges();
            }
            catch (Exception) {

                throw;
            }

            return Json(true);
        }

        [HttpPost]
        public void Atualizar(Usuario usuario) {
            try {
                db.Entry(usuario).State = EntityState.Modified;
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
                Usuario usuario = db.Usuarios.Find(id);

                if (usuario == null) {
                    return HttpNotFound();
                }
                return Json(usuario, JsonRequestBehavior.AllowGet);
            }
            catch (Exception) {
                throw;
            }
        }


        [HttpPost]
        public void Delete(int? id) {
            try {
                Usuario usuario = db.Usuarios.Find(id);
                db.Usuarios.Remove(usuario);
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
