$(document).ready(function () {

// Declaro mis variables.

    let array = document.getElementById("array");
    let miFormulario = $("#form")
    let parrafo = $("#parrafo")
    let ocultar = $("#btnOcultar")
    let mostrar = $("#btnMostrar").hide()
    let borrar = $("#btnBorrar")
    let personas = [];

// Constructor del objeto para guardar las personas.

    class Persona {
        constructor(nombre, apellido, dni, edad, foto) {
            this.apellido = apellido;
            this.nombre = nombre;
            this.dni = parseFloat(dni);
            this.edad = parseFloat(edad);
            this.foto = foto;
        }
    };

// Si existe un array de personas guardado en el localStorage lo recorre.

    if (localStorage.getItem("arrayDePersonas")) {
        personas = JSON.parse(localStorage.getItem("arrayDePersonas"))
        personas.forEach(e => {
            array.innerHTML +=
                `
                <div class="card" style="width: 14rem;">
                <div class="card-body">
                <img class="imgPersona" src="${e.foto}">
                <h5 class="card-title">${e.apellido} ${e.nombre}</h5>
                <h6 class="card-text">DNI: ${e.dni}</h6>
                <p class="card-text">Edad: ${e.edad}</p>
                </div> 
                </div>
                `
        });
    }

// Funcion la cual uso para mostrar las personas ingresadas.

    const mostrarPersonas = () => {
        array.innerHTML = "";
        personas.forEach(e => {
        
            array.innerHTML +=
                `
                <div class="card" style="width: 14rem;">
                <div class="card-body">
                <img class="imgPersona" src="${e.foto}">
                <h5 class="card-title">${e.apellido} ${e.nombre}</h5>
                <h6 class="card-text">DNI: ${e.dni}</h6>
                <p class="card-text">Edad: ${e.edad}</p>
                </div> 
                </div>
                `
        });
    }

// Funcion utilizada para marcar un error.

    let error = () => {
        setTimeout(function () { parrafo.html(`<p style="color: red;">Por favor, complete todos los casilleros!</p>`) }, 10);
        setTimeout(function () { EmptyAll() }, 2000);
    }

// Evento para captar el enviar del formulario.

    miFormulario.submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            success: function(data) {
            let fotos = data.results[0].picture.large;
        
        if ($("#input1").val() != "" && $("#input2").val() != "" && $("#input3").val() != "" && $("#input4").val() != "") {
            pusheadorDeUsuarios($("#input1").val().toUpperCase(), $("#input2").val().toUpperCase(), $("#input3").val(), $("#input4").val(), fotos);
        } else {
            error();
        }
    }
});
    });

    // Funcion que se encarga de guardar en el localStorage un array de las personas ingresadas.

    guardarLocal = (a, b) => {
        localStorage.setItem(a, b);
    }

// Funcion utilizada para vaciar los casilleros

    const EmptyAll = () => {
        parrafo.html(`<p style="color: white;"></p>`);
        $("#input1").val("");
        $("#input2").val("");
        $("#input3").val("");
        $("#input4").val("");
    }

// Funcion utilizada para vaciar los casilleros cuando se completan todos los datos con exito

    const EmptyForm = () => {
        setTimeout(function () { parrafo.html(`<p style="color: rgb(0, 221, 0);">Usuario Nº${personas.length} registrado con exito!</p>`) }, 10);
        setTimeout(function () { parrafo.html(`<p style="color: white;">.</p>`) }, 1800);
        $("#input1").val("")
        $("#input2").val("")
        $("#input3").val("")
        $("#input4").val("")
    }

// Funcion que se encarga de pushear los usuarios al array y invoca otras funcionas fundamentales.

    const pusheadorDeUsuarios = (a, b, c, d, e) => {
        personas.push(new Persona(a, b, c, d, e));
        
        guardarLocal("arrayDePersonas", JSON.stringify(personas));
        
        mostrarPersonas(personas)
        
        EmptyForm()
    }

// Evento encargado de captar el click.

    ocultar.click(function (e) {
        e.preventDefault();
        $("#array").fadeOut()
        mostrar.show()
        ocultar.hide()
    });

// Evento encargado de captar el click.

    mostrar.click(function (e) {
        e.preventDefault();
        $("#array").fadeIn(1000)
        ocultar.show()
        mostrar.hide()
    });

// Evento encargado de captar el click.

    borrar.click(function () {
        localStorage.clear()
        if (personas == "") {
            parrafo.html(`<p style="color: red;">No hay usuario/s para eliminar!</p>`)
        } else {
            parrafo.html(`<p style="color: rgb(0, 221, 0);">Usuarios eliminados con exito!</p>`)
        }
        setTimeout(function () { location.reload() }, 2000);
    })
});

