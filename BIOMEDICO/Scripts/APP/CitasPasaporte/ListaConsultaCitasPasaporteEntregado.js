﻿var tablaCitasPasaporte = [];
$(document).ready(function () {

    RenderTable('datatable-pasaporteentregadas', [0, 1, 2, 3, 4, 5, 6, 7], null, {
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

    tablaCitasPasaporte = $('#datatable-pasaporteentregadas').DataTable();
    Get_Data(CargarTabla, '/CitasPasaporte/GetListCitasPasaporteEntregado')

});
var Arraycitasglobal = [];
function CargarTabla(data) {
    tablaCitasPasaporte.clear().draw();
    let CitasPasaportEntregado = data.objeto;
    Arraycitasglobal = CitasPasaportEntregado;
    console.log(CitasPasaportEntregado);
    $.each(CitasPasaportEntregado, function (index, item) {
        if (item.Fecha != null) {
            let Fecha;
            if (item.Fecha != null) {
                Fecha = JSONDateconverter(item.Fecha);
            }
            tablaCitasPasaporte.row.add([

                item.TipoSolicitudPasaporte,
                item.EstadoPasaporte,
                item.Fecha == undefined ? '' : JSONDateconverter(item.Fecha),
                item.Hora + ": " + item.Minutos,
                item.TipoDocumentoPasaporte,
                item.NombresPasaporte,
                item.ApellidosPasaporte,
                item.TipoPasaporte,



                ////'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdCitaMedica + ')" ></i>&ensp;' +
                ////'<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdCitasPasaporte + ')"></i>&ensp;' +
                ////'<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdCitasPasaporte + ')" ></i>&ensp;' +
                //'<i class="btn btn-outline-primary btn-group-sm fa fa-medkit" title="Tramitarcita" onclick="ActualizarEstadollTramitado(' + item.IdCitasPasaporte + ')" > Entregar</i>&ensp;'

            ]).draw(false);



        }

    });
}



