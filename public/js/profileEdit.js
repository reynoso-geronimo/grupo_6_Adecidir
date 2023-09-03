let formularioEdicionPerfil = document.querySelector("#formularioEdicionPerfil");
formularioEdicionPerfil.onsubmit= ()=>{
    let nombre = document.querySelector("input.nombre");
    let apellido = document.querySelector("input.apellido");
    let direccion = document.querySelector("input.direccion");
    let telefono = document.querySelector("input.telefono");

    let errores = [];
    if(nombre.length <= 1 ){
        errores.push("El nombre es un campo obligatorio.");
    }
    if(apellido.length <= 1 ){
        errores.push("El apellido es un campo obligatorio.");
    }
    if(direccion.length <= 1 ){
        errores.push("El direccion es un campo obligatorio.");
    }
    if(telefono.length <= 1 ){
        errores.push("El telefono es un campo obligatorio.");
    }

    if(errores.length > 0){
        event.preventDefault();
        let signIn = document.querySelector(".body-login .sign-in");
        signIn+= '<div class="errores">';
        errores.forEach(error=>{
            signIn+= '<p>${error}</p>';
        });
        signIn+= '</div">';

    }
    
}