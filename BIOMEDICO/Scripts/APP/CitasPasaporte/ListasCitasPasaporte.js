

var tablaCitasPasaporte = [];
$(document).ready(function () {

    RenderTable('datatable-pasaporte', [0, 1, 2, 3, 4, 5], null, {
        "paging": true,
        "ordering": false,
        "info": true,
        "searching": true,

        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
        //dom: 'frtip',

        buttons: [
            {
                extend: 'excelHtml5',
                text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> Excel ",
                filename: "CitasPasaporte",
                titleAttr: 'Excel',
            },
            //{
            //    extend: 'pdfHtml5',
            //    text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> PDF ",
            //    filename: "CitasPasaporte",
            //    titleAttr: 'Excel',
            //},

        ]
    });

    tablaCitasPasaporte = $('#datatable-pasaporte').DataTable();
    Get_Data(CargarTabla, '/CitasPasaporte/GetListCitasPasaporte')

});
var Arraycitasglobal = [];
function CargarTabla(data) {
    tablaCitasPasaporte.clear().draw();
    let CitasPasaport = data.objeto;
    Arraycitasglobal = CitasPasaport;
    console.log(CitasPasaport);
    $.each(CitasPasaport, function (index, item) {
        if (item.Fecha != null) {
            let Fecha;
            if (item.Fecha != null) {
                Fecha = JSONDateconverter(item.Fecha);
            }
            tablaCitasPasaporte.row.add([
                /* item.IdCitasPasaporte,*/
                item.OficinaPasaporte,
                item.EstadoPasaporte,
                Fecha,
                item.Hora + ": " + item.Minutos + " :" + item.Segundos,
                item.NombresPasaporte,



                '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdCitasPasaporte + ')" ></i>&ensp;' +
                '<i class="btn btn-warning btn-group-sm fa fa-medkit" title="CambiarEstado" onclick="CambiarEstado(' + item.IdCitasPasaporte + ')" ></i>&ensp;' +
                //'<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdCitasPasaporte + ')"></i>&ensp;' +
                '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdCitasPasaporte + ')" ></i>&ensp;' +
                '<i class="btn btn-primary btn-group-sm icon-calendar52" id="edit_ActEco_' + index + '" title="RegistrarCita" style="fontsize:90px !important" onclick="RegistarCitasMEdicasData(' + item.IdCitasPasaporte + ')" ></i>&ensp;'
            ]).draw(false);



        }
        
    });
}


function ActualizardEportistaData(idCitasPasport) {
    window.location.href = '../CitasPasaporte/Agregar?IdCitasPasportReg=' + idCitasPasport +'&IsUpdate=true';

}

//function RegistarCitasMEdicasData(idCitasPasport) {
//    let CitasSelect = Arraycitasglobal.find(w => w.IdCitasPasaporte == idCitasPasport);
//    if (CitasSelect != undefined) {
//        let Especialidad = CitasSelect.Especialista.split(':')[0];
//        switch (Especialidad) {
//            case "MEDICINA DEL DEPORTE":
//                window.location.href = '../MedicinaDeportiva/Agregar?IdCitasPasportReg=' + idCitasPasport + '&IsUpdate=false&Ced=' + CitasSelect.NumIdentificacion;
//                break;
//            case "FISIOTERAPIA":
//                window.location.href = '../ControlFisioterapia/Agregar?IdCitasPasportReg=' + idCitasPasport + '&IsUpdate=false&Ced=' + CitasSelect.NumIdentificacion;
//                break;
//            case "PSICOLOGIA":
                
//                window.location.href = '../Psicologia/Agregar?IdCitasPasportReg=' + idCitasPasport + '&IsUpdate=false&Ced=' + CitasSelect.NumIdentificacion;
                
//                break;
//            case "NUTRICIÓN":
//                window.location.href = '../Nutricion/Agregar?IdCitasPasportReg=' + idCitasPasport + '&IsUpdate=false&Ced=' + CitasSelect.NumIdentificacion;
//                break;
//            default:
//                break;
//        }
       
//    }
    

//}
function DetalleData(idCitasPasport) {
    window.location.href = '../CitasPasaporte/Agregar?IdCitasPasportReg=' + idCitasPasport + "&Viewdetail=SI";

}
function CambiarEstado(idCitasPasport) {
    swal({
        title: "Atención",
        text: "¿Estas seguro de actualizar el estado de la cita medica?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                swal.close()
                Get_Data(RecargarTabla, '/CitasPasaporte/ActualizarEstado?IdCitasPasaporte=' + idCitasPasport);
            }
            else {
                swal.close()
            }
        });
}


function Eliminar(idCitasPasport) {
    swal({
        title: "Atención",
        text: "¿Estas seguro de eliminar este registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                swal.close()
                Get_Data(RecargarTabla, '/CitasPasaporte/Eliminar?IdCitasDepor=' + idCitasPasport);
            }
            else {
                swal.close()
            }
        });
}

function RecargarTabla() {
    Get_Data(CargarTabla, '/CitasPasaporte/GetListCitasPasaporte')
}