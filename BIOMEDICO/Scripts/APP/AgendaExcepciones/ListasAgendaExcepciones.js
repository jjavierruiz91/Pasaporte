

var TablaAgendaExcepciones = [];
$(document).ready(function () {

    RenderTable('datatable-Agenda', [0, 1, 2, 3, 4, 5,6], null, {
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
                filename: "AgendaExcepciones",
                titleAttr: 'Excel',
            },
            {
                extend: 'pdfHtml5',
                text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> PDF ",
                filename: "AgendaExcepciones",
                titleAttr: 'Pdf',
            },

        ]
    });


    TablaAgendaExcepciones = $('#datatable-Agenda').DataTable();
    Get_Data(CargarTabla, '/AgendaExcepciones/GetListAgendaExcepciones')

});
var Arraycitasglobal = [];
function CargarTabla(data) {
    TablaAgendaExcepciones.clear().draw();
    let AgendaExcepcionesPassport = data.objeto;
    Arraycitasglobal = AgendaExcepcionesPassport;
    console.log(AgendaExcepcionesPassport);
    $.each(AgendaExcepcionesPassport, function (index, item) {
        if (item.Fecha != null) {
            let Fecha;
            if (item.Fecha != null) {
                Fecha = JSONDateconverter(item.Fecha);
            }
            TablaAgendaExcepciones.row.add([
                
                item.TipoSolicitudAgendaExcepciones,
                item.NumeroDocumentoAgendaExcepciones,
                item.NombresAgendaExcepciones,
                item.ApellidosAgendaExcepciones,
                item.TipoPasaporteAgendaExcepciones,
                item.FechaAgendaExcepciones,
                



                '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdAgendaExcepciones + ')" ></i>&ensp;' +
                '<i class="btn btn-warning btn-group-sm fa fa-medkit" title="CambiarEstado" onclick="CambiarEstado(' + item.IdAgendaExcepciones + ')" ></i>&ensp;' +
                '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizarAgendaCitas(' + item.IdAgendaExcepciones + ')"></i>&ensp;' +
                '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdAgendaExcepciones + ')" ></i>&ensp;' +
                '<i class="btn btn-primary btn-group-sm icon-calendar52" id="edit_ActEco_' + index + '" title="RegistrarCita" style="fontsize:90px !important" onclick="RegistarCitasMEdicasData(' + item.IdAgendaExcepciones + ')" ></i>&ensp;'
            ]).draw(false);



        }

    });
}


function ActualizarAgendaCitas(IdAgendaExcepcionesPassport) {
    window.location.href = '../AgendaExcepciones/Agregar?IdAgendaReg=' + IdAgendaExcepcionesPassport + '&IsUpdate=true';

}


function DetalleData(IdAgendaExcepcionesPassport) {
    window.location.href = '../AgendaExcepciones/Agregar?IdAgendaReg=' + IdAgendaExcepcionesPassport + "&Viewdetail=SI";

}
function CambiarEstado(IdAgendaExcepcionesPassport) {
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
                Get_Data(RecargarTabla, '/AgendaExcepciones/ActualizarEstado?IdAgendaExcepciones=' + IdAgendaExcepcionesPassport);
            }
            else {
                swal.close()
            }
        });
}


function Eliminar(IdAgendaExcepcionesPassport) {
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
                Get_Data(RecargarTabla, '/AgendaExcepciones/Eliminar?IdCitasDepor=' + IdAgendaExcepcionesPassport);
            }
            else {
                swal.close()
            }
        });
}

function RecargarTabla() {
    Get_Data(CargarTabla, '/AgendaExcepciones/GetListAgendaExcepciones')
}