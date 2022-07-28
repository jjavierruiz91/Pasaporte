﻿var tablaCitasPasaporte = [];
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
    Get_Data(CargarTabla, '/CitasPasaporte/GetListConsultaCitasMedicas')

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
                /* item.IdCitaMedica,*/
                item.OficinaPasaporte,
                item.EstadoPasaporte,
                Fecha,
                item.Hora + ": " + item.Minutos + " :" + item.Segundos,
                item.NombresPasaporte,



                //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdCitaMedica + ')" ></i>&ensp;' +
                '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdCitasPasaporte + ')"></i>&ensp;' +
                '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdCitasPasaporte + ')" ></i>&ensp;' +
                '<i class="btn btn-primary btn-group-sm icon-calendar52" id="edit_ActEco_' + index + '" title="RegistrarCita" style="fontsize:90px !important" onclick="RegistarCitasMEdicasData(' + item.IdCitasPasaporte + ')" ></i>&ensp;'
            ]).draw(false);



        }
        
    });
}


function ActualizardEportistaData(idCitasPasport) {
    window.location.href = '../CitasPasaporte/Agregar?IdReg=' + idCitasPasport + +'&IsUpdate=true';

}

function RegistarCitasMEdicasData(idCitasPasport) {
    let CitasSelect = Arraycitasglobal.find(w => w.IdCitaMedica == idCitasPasport);
    if (CitasSelect != undefined) {
        let Especialidad = CitasSelect.Especialista.split(':')[0];
        switch (Especialidad) {
            case "ABOGADA":
                window.location.href = '../MedicinaDeportiva/Agregar?IdReg=' + idCitasPasport + '&IsUpdate=false&Ced=' + CitasSelect.NumIdentificacion;
                break;
            case "PSICOLOGA":
                window.location.href = '../Fisioterapia/Agregar?IdReg=' + idCitasPasport;
                break;
            default:
                break;
        }
       
    }
    

}
function DetalleData(idCitasPasport) {
    window.location.href = '../CitasPasaporte/Agregar?IdReg=' + idCitasPasport + "&Viewdetail=SI";

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