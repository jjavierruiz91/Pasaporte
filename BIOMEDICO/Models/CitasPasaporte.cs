//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BIOMEDICO.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class CitasPasaporte
    {
        internal readonly string CedSucursalCitas;
        internal readonly string SucursalCitas;
        internal readonly int? HoraUsada;
        internal readonly int? MinutosUsados;
        internal readonly int? HoraUsadas;
        internal readonly int? MinutosUsado;

        public int IdCitasPasaporte { get; set; }
        public string OficinaPasaporte { get; set; }
        public string EstadoPasaporte { get; set; }
        public string TipoSolicitudPasaporte { get; set; }
        public string TipoDocumentoPasaporte { get; set; }
        public Nullable<long> NumDocumentoPasaporte { get; set; }
        public Nullable<System.DateTime> FechaExpedicionDocumento { get; set; }
        public string NombresPasaporte { get; set; }
        public string ApellidosPasaporte { get; set; }
        public string CelularPasaporte { get; set; }
        public string CorreoPasaporte { get; set; }
        public string TipoPasaporte { get; set; }
        public string MenoresEdadPasaporte { get; set; }
        public string ParentescoMenor { get; set; }
        public string CuantosMenores { get; set; }
        public string NombreSucursales { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public Nullable<int> Hora { get; set; }
        public Nullable<int> Minutos { get; set; }
        public Nullable<int> Segundos { get; set; }
        public Nullable<long> NumIdentificacion { get; set; }
        public Nullable<System.DateTime> FechaRegistro { get; set; }
        public Nullable<System.DateTime> FechaEstado { get; set; }
        public string UsuarioRegistra { get; set; }
        public string UsuarioEstado { get; set; }
        public string DireccionIp { get; set; }
    }
}
