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
    
    public partial class EvaluacionFisioterapia
    {
        public int IdEvaluacion { get; set; }
        public string LesionEvaluacion { get; set; }
        public string CualLesionEvaluacion { get; set; }
        public string MmssSimetria { get; set; }
        public string MmssAsimetria { get; set; }
        public string MmiiSimetria { get; set; }
        public string MmiiAsimetria { get; set; }
        public string DescripcionAsimetria { get; set; }
        public string DescripcionSimetria { get; set; }
        public string PosturaEvaluacionFisio { get; set; }
        public string TrotePuesto { get; set; }
        public string GeneroFisioterapia { get; set; }
        public string SuperiosTest { get; set; }
        public string ExcelenteTest { get; set; }
        public string BuenoTest { get; set; }
        public string Promediotest { get; set; }
        public string DeficienteTest { get; set; }
        public string PobreTest { get; set; }
        public string MuyPobreTest { get; set; }
        public string SentadillaCali { get; set; }
        public string TijeraCali { get; set; }
        public string HombroCali { get; set; }
        public string PiernaCali { get; set; }
        public string TroncoCali { get; set; }
        public string PasoVallaCali { get; set; }
        public string EstabilidadCali { get; set; }
        public string TotalCali { get; set; }
        public string SentadillaObs { get; set; }
        public string TijeraObs { get; set; }
        public string HombroObs { get; set; }
        public string PiernaObs { get; set; }
        public string TroncoObs { get; set; }
        public string PasoVallaObs { get; set; }
        public string EstabilidadObs { get; set; }
        public string TotalObs { get; set; }
        public string ResistenciaF { get; set; }
        public string ResistenciaM { get; set; }
        public string Puentef { get; set; }
        public string PuenteM { get; set; }
        public string ExtensoresF { get; set; }
        public string ExtensoresM { get; set; }
        public string PuenteDF { get; set; }
        public string PuenteDM { get; set; }
        public string PuenteIF { get; set; }
        public string PuenteIM { get; set; }
        public string CalificacionObs { get; set; }
        public string ExcelenteEvaluacion { get; set; }
        public string MuyBuenoEvaluacion { get; set; }
        public string BuenoEvaluacion { get; set; }
        public string RegularEvaluacion { get; set; }
        public string MaloRegulacion { get; set; }
        public string RecomendacionesObs { get; set; }
        public Nullable<long> NumIdentificacion { get; set; }
        public string FirmaDoctorFisioterapia { get; set; }
        public Nullable<int> IdFisioterapia { get; set; }
        public string TestSitGenero { get; set; }
        public string TestSitSuperior { get; set; }
        public string TestSitExcelente { get; set; }
        public string TestSitBueno { get; set; }
        public string TestSitPromedio { get; set; }
        public string TestSitDeficiente { get; set; }
        public string TestSitPobre { get; set; }
        public string TestSitMuyPobre { get; set; }
        public string TestSentadillaProfunda1 { get; set; }
        public string TestSentadillaProfunda2 { get; set; }
        public string TestPasodeValla1 { get; set; }
        public string TestPasodeValla2 { get; set; }
        public string TestTijeraLinea1 { get; set; }
        public string TestTijeraLinea2 { get; set; }
        public string TestHombro1 { get; set; }
        public string TestHombro2 { get; set; }
        public string TestMovilidadPierna1 { get; set; }
        public string TestMovilidadPierna2 { get; set; }
        public string TestPush1 { get; set; }
        public string TestPush2 { get; set; }
        public string TestEstabilidadTronco1 { get; set; }
        public string TestEstabilidadTronco2 { get; set; }
        public string TestEstabilidadRotatoria1 { get; set; }
        public string TestEstabilidadRotatoria2 { get; set; }
        public string TestSumarotia1 { get; set; }
        public string TestSumarotia2 { get; set; }
        public string TestObservaciones1 { get; set; }
        public string TestObservaciones2 { get; set; }
        public string TestFlexora1 { get; set; }
        public string TestFlexora2 { get; set; }
        public string TestPuente1 { get; set; }
        public string TestPuente2 { get; set; }
        public string TestResistencia1 { get; set; }
        public string TestResistencia2 { get; set; }
        public string TestPuenteLateral1 { get; set; }
        public string TestPuenteLateral2 { get; set; }
        public string TestCoreSumatoria1 { get; set; }
        public string TestCoreSumatoria2 { get; set; }
        public string TestCoreObservaciones1 { get; set; }
        public string TestCoreObservaciones2 { get; set; }
        public string TestCoreExcelente { get; set; }
        public string TestCoreMuyBueno { get; set; }
        public string TestCoreBueno { get; set; }
        public string TestCoreRegular { get; set; }
        public string TestCoreMalo { get; set; }
    
        public virtual Fisioterapia Fisioterapia { get; set; }
    }
}
