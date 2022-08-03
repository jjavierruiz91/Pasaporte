var ObjCitasPasaporte = {
    CitasPasaport: {}//{objetos} llaves y [array] corchetes

}
//var validadorFormDeportista = [];
var IsUpdate = false;
var idCitasPasaporteData = 0;
var VerDetalles = 'NO';

$(document).ready(function () {//FUNCION INICIAL;
    idCitasPasaporteData = getQueryVariable('IdCitasPasportReg');
    let NumDocumentoPasaporte = getQueryVariable('Ced');
    VerDetalles = getQueryVariable('Viewdetail');
    IdCitasPasaporte = getQueryVariable('IdReg');
    Get_DataGet(CargarSelectSucursales, '/Sucursal/GetListSucursalesPasaporte');
    if (idCitasPasaporteData > 0) {
        IsUpdate = true;
    }
    if (NumDocumentoPasaporte > 0) {
        $('#CodSucursal').val(NumDocumentoPasaporte);
        CargarInfoinicial();
    }
    if (VerDetalles == "SI") {
        $('#SaveCitasPasaporte').html('Atras')
        Get_Data(LlenarCampos, '/CitasPasaporte/GetCitasPasaporteById?IdCitasPaspor=' + idCitasPasaporteData);
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveCitasPasaporte').html('Actualizar')
        Get_Data(LlenarCampos, '/CitasPasaporte/GetCitasPasaporteById?IdCitasPaspor=' + idCitasPasaporteData);
    }

});

function CargarInfoinicial() {
    var Valuecedula = $('#IdPasaport').val();
    Get_Data(LlenarcamposInicial, '/CitasPasaporte/BuscarCitasPasaporte?IdPasaport=' + Valuecedula)
}



//function LlenarcamposInicial(data) {
//    $('#PrimerNombre').val(data.PrimerNombre)
//    $('#SegundoNombre').val(data.SegundoNombre)
//    $('#PrimerApellido').val(data.PrimerApellido)
//    $('#SegundoApellido').val(data.SegundoApellido)
//    $('#Genero').val(data.Genero)
//    $('#Edad').val(data.Edad)
//    $('#Deporte').val(data.Deporte)
//}

//function LlenarCampos(data) {
//    $('#IdCitasPasaporte').val(data.objeto.IdCitasPasaporte);
//    $('#Sucursales').val(data.objeto.Sucursales);
//    $('#Fecha').val(JSONDateconverter(data.objeto.Fecha));
//    $('#Hora').val(data.objeto.Hora);
//    $('#Minutos').val(data.objeto.Minutos);
//    $('#Segundos').val(data.objeto.Segundos);
//    $('#CodSucursal').val(data.objeto.NumIdentificacion);

//    CargarInfoinicial();
//}

var ListFechas = [];
var fecha = [];
var substringa = [];
var fechabydisable = [];
var fechaByDisable2 = [];
function FechasMarcada() {
    var formURL = '/InformeGotaGota/InformeGeneralFecha';
    $.ajax(
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (!data.Is_Error) {
                    ListFechas = data.Objeto;
                    console.log(ListFechas);
                    for (var i = 0; i < ListFechas.length; i++) {
                        fecha.push(JSONDateconverter(ListFechas[i], false));
                    }


                    $.each(fecha, function (index, item) {
                        substringa = item.split("-");
                        fechabydisable.push(substringa);

                        fechabydisable[index][1] = fechabydisable[index][1] * 1 - 1;
                        fechabydisable[index][3] = "inverted";
                        fechaByDisable2.push(fechabydisable);

                    });
                    fechabydisable.push({ from: [1800, 1, 1], to: [3000, 1, 1] })

                    $(".pickdate").pickadate({
                        disable: fechabydisable,
                        labelMonthNext: 'Ir al siguiente mes',
                        labelMonthPrev: 'Ir al mes anterior',
                        labelMonthSelect: 'Seleccionar mes',
                        labelYearSelect: 'Seleccionar año',
                        labelDaySelect: 'aqui',
                        klass: {
                            navPrev: '',
                            navNext: '',
                        },

                        selectMonths: true,
                        selectYears: 100,
                        min: new Date(1800, 1, 1),
                        max: new Date(),
                        max: new Date(),
                        today: 'Hoy',
                        close: 'Cerrar',
                        clear: '',


                        onSet: function (context) {
                            if (context.select != undefined) {
                                var date = new Date(context.select);
                                var formatdate = formatDate(date);
                                $(this.$node).val(formatdate).trigger("change");
                            } else {

                                var date = new Date(parseInt("" + context.highlight[0]), parseInt("" + context.highlight[1]), parseInt("" + context.highlight[2]));
                                var finderdate = fechabydisable.find(function (val) {
                                    var datedi = new Date(val[0] * 1, val[1] * 1, val[2] * 1);
                                    return datedi == date;
                                });
                                if (finderdate != null && finderdate != undefined) {
                                    var formatdate = formatDate(date);
                                    $(this.$node).val(formatdate).trigger("change");
                                } else {
                                    var finderdate = fechabydisable.find(function (val) {
                                        var datedi = new Date(val[0] * 1, val[1] * 1, val[2] * 1);
                                        return datedi > date;
                                    });
                                    if (finderdate != null && finderdate != undefined)
                                        this.set({ select: new Date(finderdate[0] * 1, finderdate[1] * 1, finderdate[2] * 1) });
                                    else {
                                        finderdate = fechabydisable[fechabydisable.length - 2];
                                        this.set({ select: new Date(finderdate[0] * 1, finderdate[1] * 1, finderdate[2] * 1) });
                                    }
                                }

                            }
                        }
                    });

                } else {
                    swal({
                        title: "¡Advertencia!",
                        text: data.Msj,
                        type: "error",
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: " ACEPTAR ",
                        closeOnConfirm: true
                    });
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

}

var DatosHorario = [];
function CargarSelectSucursales(data) {
    Sucursales = data;
    console.log(Sucursales);
    var HtmlEmp = "";
    HtmlEmp = "<option value=''>Seleccionar</option>"
    $.each(data.objeto.DatosSucursal, function (index, item) {
    
        HtmlEmp += "<option value='" + item.CodSucursal + "'>" + item.EspecialidadSucursal + "</option>"

    //    HtmlEmp += "<option value='" + item.CodMedicos + "'>" + item.Especialidad + " - "+item.PrimerApellido+ "</option>"
    })
    $('#Sucursales').html(HtmlEmp); 
    $('#Sucursales').select2();
    DatosHorario=Sucursales.objeto.ListaHorario;
}

function CargarSelectFecha() {
    let ArrayFecha = [];
    let Sucursales = $('#Sucursales').val();
    let agenda = DatosHorario.filter(w => w.CodSucursal == Sucursales);
    var HtmlEmp = "";
    HtmlEmp = "<option value='' >Seleccionar</option>"
    $.each(agenda, function (index, item) {
        let ExistefEcha = ArrayFecha.find(w => w == item.Fecha);

        if (ExistefEcha == undefined) {
            HtmlEmp += "<option value='" + item.Fecha + "'>" + JSONDateconverter(item.Fecha) + "</option>"
            ArrayFecha.push(item.Fecha);
        }
       
    })
    $('#Fecha').html(HtmlEmp);
    $('#Fecha').select2();
}

function CargarSelectHora() {
    let Arrayhra = [];
    let FechasElect = $('#Fecha').val();
    let Sucursales = $('#Sucursales').val();
    let Horarios = DatosHorario.filter(w => w.Fecha == FechasElect && w.CodSucursal == Sucursales);
    var HtmlEmp = "";
    HtmlEmp = "<option value=''>Seleccionar</option>";
    $.each(Horarios, function (index, item) {
        let ExisteHOra = Arrayhra.find(w => w == item.Hora);

        if (ExisteHOra == undefined) {
            HtmlEmp += "<option value='" + item.Hora + "'>" + item.Hora + "</option>"
            Arrayhra.push(item.Hora);
        }
         

    })
    $('#Hora').html(HtmlEmp);
    $('#Hora').select2();
}

function CargarSelectMInutos() {
    let ArrayFecha = [];
    let FechasElect = $('#Fecha').val();
    let Sucursales = $('#Sucursales').val();
    let hora = $('#Hora').val();
    let Horarios = DatosHorario.filter(w => w.Fecha == FechasElect && w.CodSucursal == Sucursales && w.Hora ==parseInt(hora));
    
    var HtmlMin = "";
    HtmlMin = "<option value=''>Seleccionar</option>"
    $.each(Horarios, function (index, item) {

        HtmlMin += "<option value='" + item.Minutos + "'>" + item.Minutos + "</option>"


    })
    $('#Minutos').html(HtmlMin);
    $('#Minutos').select2();
}



function getQueryVariable(variable) {//saca los valores de la uRL
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return 0;
}

function Atras() {
    window.history.back();
}

function Createobj() {
    document.getElementById("SaveCitasPasaporte").disabled = true;

    // if (validadorFormMedicinaDeportiva.form()) {
    if (VerDetalles == "SI") {
        Atras();
    }
    else {
        var test = $('#NumIde').val();
        var IdCitasPasaporte = 0;
        if (IsUpdate) {
            IdCitasPasaporte = idCitasPasaporteData;
        }
            ObjCitasPasaporte = {
                CitasPasaport: {

       
             IdCitasPasaporte: IdCitasPasaporte,
                    OficinaPasaporte: $('#OficinaPasaporte').val(),
                    TipoSolicitudPasaporte: $('#TipoSolicitudPasaporte').val(),
                    TipoDocumentoPasaporte: $('#TipoDocumentoPasaporte').val(),
                    NumDocumentoPasaporte: $('#NumDocumentoPasaporte').val(),
                    FechaExpedicionDocumento: JSONDateconverter($('#FechaExpedicionDocumento').val()),
                    NombresPasaporte: $('#NombresPasaporte').val(),
                    ApellidosPasaporte: $('#ApellidosPasaporte').val(),
                    CelularPasaporte: $('#CelularPasaporte').val(),
                    CorreoPasaporte: $('#CorreoPasaporte').val(),
                    TipoPasaporte: $('#TipoPasaporte').val(),
                    MenoresEdadPasaporte: $('#MenoresEdadPasaporte').val(),
                    ParentescoMenor: $('#ParentescoMenor').val(),
                    NombreSucursales: $('#Sucursales').val(),
                    CuantosMenores: $('#CuantosMenores').val(),
                    Fecha: JSONDateconverter($('#Fecha').val()),
                    Hora: $('#Hora').val(),
                    Minutos: $('#Minutos').val(),
                    Segundos: $('#Segundos').val(),
                    NumIdentificacion: $('#CodSucursal').val(),
                    //FechaRegistro: JSONDateconverter($('#FechaRegistro').val()),
                    //FechaEstado: JSONDateconverter($('#FechaEstado').val()),
                    UsuarioRegistra: $('#UsuarioRegistra').val(),
                    UsuarioEstado: $('#UsuarioEstado').val(),
                    DireccionIp: $('#DireccionIp').val(),

                    


         
     
       
       


            }
        }
        let id = 10;

        if (IsUpdate) {
            Save_Data(ActualizarVista, '/CitasPasaporte/Actualizar', ObjCitasPasaporte, 'Actualizacion');
        }
        else {
            Save_Data(ActualizarVista, '/CitasPasaporte/Agregar', ObjCitasPasaporte, 'Guardado');

            // LimpiarFormulario()
        }

        //} else {
        //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
        //}

    }

}
function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../CitasPasaporte/ListaCitasPasaporte"
    }
}


function LimpiarFormulario() {

    $('#IdCitasPasaporte').val('')
    $('#Sucursales').val('')
    $('#Fecha').val('')
    $('#Hora').val('')
    $('#Minutos').val(''),
    $('#Segundos').val('')
    

}

