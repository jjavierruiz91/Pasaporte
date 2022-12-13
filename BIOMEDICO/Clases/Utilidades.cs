using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Web;
using Microsoft.Reporting.Map.WebForms.BingMaps;
using System.Security.Cryptography;

namespace BIOMEDICO.Clases
{
    public class Utilidades
    {
        static string smtpAddress = "smtp.office365.com";
        static int portNumber = 587;
        static bool enableSSL = true;
        static string emailFromAddress = "pasaportegobcesar@outlook.com"; //Sender Email Address  mooncodetest@outlook.com
        static string password = "Sistemas2021"; //Sender Password #Netcoresmtp


        public static  void SendEmail(string Texto, string emailTo , string NombresPasaporte ,  string ApellidosPasaporte)
        {
            string emailToAddress = emailTo;

            string subject = "OFICINA PASAPORTE GOBERNACIÓN DEL CESAR";
            string body = @"<html><body><div style='color:black'>
                                                
                            
                                <strong> OFICINA PASAPORTE GOBERNACIÓN DEL CESAR </strong>
                            
                                <p> 

                    El  <strong> pasaporte ordinario  </strong> tiene un valor de $ 271.000 pesos colombianos ($115.000 que corresponden a Cancillería y $156.000 que corresponden al impuesto Departamental
                        y timbre Nacional), valor que puede ser cancelado en efectivo o con tarjeta crédito y/o débito. </br>

                    El  <strong> pasaporte ejecutivo  </strong> tiene un valor de $ 361.000 pesos colombianos ($205.000 que corresponden a Cancillería y $156.000 que corresponden al impuesto Departamental 
                        y timbre Nacional), valor que puede ser cancelado en efectivo o con tarjeta crédito y/o débito. </br>

                        <strong> Requisitos para mayores de edad </strong> </br>
                           <ol>
                              <li>Recuerde que el día de la cita debe acercarse personalmente en la oficina que selecciono y presentar los documentos solicitados para el trámite, 
                                    la toma de la fotografía, el registro de huellas y la firma.  <strong>No es necesario llevar fotos </strong></li> </br>

                              <li>Presentar original de la cédula de ciudadanía vigente, en formato válido, o:</li> </br>
                              <li>Contraseña por primera vez expedida por la Registraduría Nacional del Estado Civil y copia del registro civil de nacimiento expedido por el Notario, Registrador o Cónsul;</li> </br>
                              <li>Contraseña expedida por solicitud de duplicado o renovación de la cédula de ciudadanía emitida por la Registraduría Nacional del Estado Civil la cual debe estar acompañada de la consulta en línea del certificado de vigencia de la cédula adelantada por la oficina expedidora a través de la página web de la Registraduría Nacional del Estado Civil.</li> </br>
                           </ol>
                                         No se aceptará contraseña por solicitud de rectificación de cédula de ciudadanía     </br>       

                                </p> 


                            </br>"

                              + Texto +" "+ NombresPasaporte +" "+ ApellidosPasaporte +




                            @"</div></body></html>";

            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress(emailFromAddress, "Oficina Pasaporte Gobernacion del Cesar");
                mail.To.Add(emailToAddress);
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                //mail.Attachments.Add(new Attachment("D:\\TestFile.txt"));//--Uncomment this to send any attachment  
                using (SmtpClient smtp = new SmtpClient(smtpAddress, portNumber))
                {
                    smtp.Credentials = new NetworkCredential(emailFromAddress, password);
                    smtp.EnableSsl = enableSSL;
                    smtp.Send(mail);
                }
            }


        }

        public static Usuarios ActiveUser
        {
            get
            {
                return HttpContext.Current.Session["ActiveUser"] as Usuarios;
            }
            set
            {
                HttpContext.Current.Session.Timeout = 60;
                HttpContext.Current.Session["ActiveUser"] = value;
            }
        }
        public static List<ASignarPermisos> Getlistapermisos()
        {
            List<ASignarPermisos> lista = new List<ASignarPermisos>();
            using (var db= new BIOMEDICO.Models.BIOMEDICOEntities5())
            {
                lista = db.ASignarPermisos.Where(w=>w.CodRol== ActiveUser.CodRol).ToList();
                foreach (var item in lista)
                {
                    item.Permisos = db.Permisos.FirstOrDefault(w => w.IdPermiso == item.CodPermiso);
                }
            }
            return lista;
        }

        public static string ConvertFileToBase64(string path)
        {
            String file = string.Empty;
            try
            {
                Byte[] bytes = File.ReadAllBytes(path);
                file = Convert.ToBase64String(bytes);
            }
            catch (Exception ex)
            {

            }
            return file;
        }
    }
}