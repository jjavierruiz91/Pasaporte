﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class BIOMEDICOEntities5 : DbContext
    {
        public BIOMEDICOEntities5()
            : base("name=BIOMEDICOEntities5")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<ASignarPermisos> ASignarPermisos { get; set; }
        public virtual DbSet<Permisos> Permisos { get; set; }
        public virtual DbSet<Rol> Rol { get; set; }
        public virtual DbSet<TipoPermiso> TipoPermiso { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }
        public virtual DbSet<Sucursal> Sucursal { get; set; }
        public virtual DbSet<AgendaExcepciones> AgendaExcepciones { get; set; }
        public virtual DbSet<CitasPasaporte> CitasPasaporte { get; set; }
        public virtual DbSet<AgendarCitas> AgendarCitas { get; set; }
    }
}
