using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Web;
using Microsoft.Reporting.Map.WebForms.BingMaps;

namespace BIOMEDICO.Clases
{
    public class Utilidades
    {
        static string smtpAddress = "smtp.office365.com";
        static int portNumber = 587;
        static bool enableSSL = true;
        static string emailFromAddress = "mooncodetest@outlook.com"; //Sender Email Address  
        static string password = "#Netcoresmtp"; //Sender Password


        public static  void SendEmail(string Texto, string emailTo)
        {
            string emailToAddress = emailTo;

            string subject = "Atención";
            string body = @"<html><body><div style='color:red'>
                                ¡Producto agotado! </br>"
                                + Texto +
                            @"</div></body></html>";

            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress(emailFromAddress, "Moon Support");
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