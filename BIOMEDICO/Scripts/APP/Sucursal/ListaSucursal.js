var TablaSucursalPasaporte = [];
$(document).ready(function () {

    RenderTable('datatable-Sucursales', [0, 1, 2, 3, 4], null, {
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
                filename: "CitasMedicas",
                titleAttr: 'Excel',
            },
            //{
            //    extend: 'pdfHtml5',
            //    text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> PDF ",
            //    filename: "CitasMedicas",
            //    titleAttr: 'Excel',
            //},

        ]
    });

    TablaSucursalPasaporte = $('#datatable-Sucursales').DataTable();
    Get_Data(CargarTabla, '/Admin/Sucursal/GetListSucursalesPasaporte')

});

function CargarTabla(data) {
    TablaSucursalPasaporte.clear().draw();
    let SucursadlPasport = data.objeto.DatosSucursal;
    console.log(SucursadlPasport);
    $.each(SucursadlPasport, function (index, item) {
        TablaSucursalPasaporte.row.add([
            /*item.IdSucursal,*/
            item.CodSucursal,
            /*item.PrimerNombre != null ? item.PrimerNombre : '' + " " + item.SegundoNombre != null ? item.SegundoNombre :'' ,*/
            item.EspecialidadSucursal,
            item.Direcccion,
            item.Correo,
            //    '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdNutricion + ')" ></i>&ensp;' +
            //    '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdNutricion + ')"></i>'
            '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdSucursal + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdSucursal + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdSucursal + ')" ></i>&ensp;'
        ]).draw(false);


        //]).draw(false);



    });
}


function ActualizardEportistaData(SucursadlPasport) {
    window.location.href = '/Admin/Sucursal/Agregar?IdReg=' + SucursadlPasport;

}
function DetalleData(SucursadlPasport) {
    window.location.href = '/Admin/Sucursal/Agregar?IdReg=' + SucursadlPasport + "&Viewdetail=SI";

}


function Eliminar(IdSucursal) {
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
                Get_Data(RecargarTabla, '/Admin/Sucursal/Eliminar?idMedicoDep=' + IdSucursal);
            }
            else {
                swal.close()
            }
        });
}

function RecargarTabla() {
    Get_Data(CargarTabla, '/Admin/Sucursal/GetListSucursalesPasaporte')
}