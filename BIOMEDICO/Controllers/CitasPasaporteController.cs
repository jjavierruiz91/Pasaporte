using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class CitasMedicasController : Controller
    {
        // GET: CitasMedicas
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ListaCitasPasaporte()
        {
            return View();
        }

        public ActionResult ListaConsultaCitasPasaporte()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetListConsultaCitasPasaporte()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var CitasPasaport = db.CitasPasaporte.ToList().OrderByDescending(o => o.IdCitasPasaporte);
              

                ret.objeto = CitasPasaport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }

        public struct ObjCitasPasaporte
        {
            public CitasPasaporte  CitasPasaport { get; set; }

        }

        public struct Respuesta
        {

            public string mensaje { get; set; }
            public bool Error { get; set; }
            public Object objeto { get; set; }

        }
        //[HttpGet]
        //public JsonResult BuscarDeportista(long cedula)
        //{
        //    var DatosdEportista = new Deportistas();
        //    using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
        //    {
        //        DatosdEportista = db.Deportistas.FirstOrDefault(w => w.NumIdentificacion == cedula);
        //    }
        //    return Json(DatosdEportista, JsonRequestBehavior.AllowGet);
        //}

        [HttpGet]

        public JsonResult BuscarAgendaCitas(long IdAgenda)
        {
            var DatosAgentaDeportista = new CitasPasaporte();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                DatosAgentaDeportista = db.CitasPasaporte.FirstOrDefault(w => w.IdCitasPasaporte == IdAgenda);
                if (DatosAgentaDeportista != null)
                {

                    DatosAgentaDeportista.EstadoCitas = "FINALIZADO";

                }

                db.SaveChanges();
            }
            return Json(DatosAgentaDeportista, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        //[ValidateAntiForgeryToken]
        public JsonResult ActualizarEstado(int IdCitaPasaporte)
        {
            Respuesta Retorno = new Respuesta();
            //JsonConvert.DeserializeObject<List<ObjDeportista>>(a);
            //if (!ModelState.IsValid)
            //    Retorno.mensaje="Datos invalidos";

            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    try
                    {
                        var CitasDeportivaExiste = db.CitasPasaporte.FirstOrDefault(w => w.IdCitasPasaporte == IdCitaPasaporte);
                        if (CitasDeportivaExiste != null)
                        {

                            
                            CitasDeportivaExiste.EstadoCitas = "FINALIZADO";

                        }

                        db.SaveChanges();

                        Retorno.Error = false;
                        Retorno.mensaje = "Actualizado";


                    }
                    catch (Exception ex)
                    {
                        Retorno.Error = true;
                        Retorno.mensaje = "Error al Actualizar";
                    }




                }
            }
            catch (Exception ex)
            {
                String Error = ex.Message;
                //ModelState.AddModelError("", "Error al agregar deportistas" + ex.Message);
                Retorno.Error = true;
                Retorno.mensaje = "Error al agregar ";
            }
            return Json(Retorno,JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult GetListCitasMedicasDeportiva()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {

                var CitasPasaport = db.CitasPasaporte.Where(w => w.EstadoCitas == "PENDIENTE").ToList();
                foreach (var item in CitasPasaport)
                {

                }

                ret.objeto = CitasPasaport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCitasMedicasDeportivaById(int IdCitasPaspor)
        {
            Respuesta ret = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {

                var CitasDepoUpdate = db.CitasPasaporte.FirstOrDefault(w => w.IdCitasPasaporte == IdCitasPaspor) ;
                if (CitasDepoUpdate != null)
                {
                }


                ret.objeto = CitasDepoUpdate;



            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult Agregar()
        {

            return View();

        }




        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Agregar(ObjCitasPasaporte a)
        {
            Respuesta Retorno = new Respuesta();

            //if (!ModelState.IsValid)
            //    Retorno.mensaje="Datos invalidos";

            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                        var EstadoCitaDeportivaExiste = db.CitasPasaporte.FirstOrDefault(w => w.EstadoCitas == "PENDIENTE" && w.Hora  == a.CitasPasaport.Hora && w.Minutos==a.CitasPasaport.Minutos );
                    if (EstadoCitaDeportivaExiste == null)
                    { 
                        int cedula = int.Parse(a.CitasPasaport.OficinaPasaporte);
                        var DatosSucursal = db.Sucursal.FirstOrDefault(w => w.CodSucursal == cedula);
                        a.CitasPasaport.OficinaPasaporte = DatosSucursal.EspecialidadSucursal+":"+ DatosSucursal.Direcccion +" "+ DatosSucursal.Telefono;
                        a.CitasPasaport.EstadoCitas = "PENDIENTE";
                        db.CitasPasaporte.Add(a.CitasPasaport);
                        db.SaveChanges();
                        Retorno.Error = false;
                        Retorno.mensaje = "Cita creada";
                    }
                    else {
                        Retorno.Error = false;
                        Retorno.mensaje = "Error! ya existe una cita creada para esta hora";
                    }

                      
                }
            }
            catch (Exception ex)
            {
                String Error = ex.Message;
                //ModelState.AddModelError("", "Error al agregar deportistas" + ex.Message);
                Retorno.Error = true;
                Retorno.mensaje = "Error al agregar";
            }
            return Json(Retorno, JsonRequestBehavior.AllowGet);
        }

        //[HttpPost]
        ////[ValidateAntiForgeryToken]
        //public JsonResult Actualizar(ObjCitasPasaportiva a)
        //{
        //    Respuesta Retorno = new Respuesta();
        //    //JsonConvert.DeserializeObject<List<ObjDeportista>>(a);
        //    //if (!ModelState.IsValid)
        //    //    Retorno.mensaje="Datos invalidos";

        //    try
        //    {

        //        using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

        //        {
        //            try
        //            {
        //                var CitasDeportivaExiste = db.CitasPasaporte.FirstOrDefault(w => w.IdCitaPasaporte == a.CitasPasaport.IdCitaPasaporte);
        //                if (CitasDeportivaExiste != null)
        //                {

        //                    CitasDeportivaExiste.IdCitaPasaporte = a.CitasPasaport.IdCitaPasaporte;
        //                    CitasDeportivaExiste.Especialista = a.CitasPasaport.Especialista;
        //                    CitasDeportivaExiste.Fecha = a.CitasPasaport.Fecha;
        //                    CitasDeportivaExiste.Hora = a.CitasPasaport.Hora;
        //                    CitasDeportivaExiste.Minutos = a.CitasPasaport.Minutos;
        //                    CitasDeportivaExiste.Segundos = a.CitasPasaport.Segundos;
        //                    CitasDeportivaExiste.EstadoCitas = "FINALIZADO";

        //                }

        //                db.SaveChanges();

        //                Retorno.Error = false;
        //                Retorno.mensaje = "Actualizado";


        //            }
        //            catch (Exception ex)
        //            {
        //                Retorno.Error = true;
        //                Retorno.mensaje = "Error al Actualizar";
        //            }




        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        String Error = ex.Message;
        //        //ModelState.AddModelError("", "Error al agregar deportistas" + ex.Message);
        //        Retorno.Error = true;
        //        Retorno.mensaje = "Error al agregar nutricionista";
        //    }
        //    return Json(Retorno);
        //}

        [HttpGet]
        public JsonResult Eliminar(int IdCitasPaspor)
        {
            Respuesta respuesta = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                try
                {
                    var CitasMedicasDepoExiste = db.CitasPasaporte.FirstOrDefault(w => w.IdCitasPasaporte == IdCitasPaspor);
                    if (CitasMedicasDepoExiste != null)
                    {
                    }

                    db.CitasPasaporte.Remove(CitasMedicasDepoExiste);
                    db.SaveChanges();
                    respuesta.Error = false;

                }
                catch (Exception ex)
                {
                    respuesta.mensaje = ex.Message;
                    respuesta.Error = true;
                }


            }

            return Json(respuesta, JsonRequestBehavior.AllowGet);
        }
    }
}