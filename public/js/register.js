let formularioRegistro = document.querySelector("#formularioRegistro");
formularioRegistro.onsubmit= ()=>{
    let nombre = document.querySelector("input.nombre");
    let apellido = document.querySelector("input.apellido");
    let email = document.querySelector("input.email");
    let clave = document.querySelector("input.clave");
    let passwordRepeat = document.querySelector("input.passwordRepeat");

    let errores = [];
    if(nombre.length <= 1 ){
        errores.push("El nombre es un campo obligatorio.");
    }
    if(apellido.length <= 1 ){
        errores.push("El apellido es un campo obligatorio.");
    }
    if(email.length < 8 || email.length > 255){
        errores.push("El Email esta fuera de rango, no tiene entre 8 y 255 caracteres");
    }
    if(!email.includes("@") || !email.includes(".")){
        errores.push("El Email no tiene el formato de correo electrónico (ejemplo: sara@gmail.com).");

    }
    if(clave.length < 8 || clave.length > 255){
        errores.push("La primera contraseña esta fuera de rango, no tiene entre 8 y 255 caracteres");
    }
    if(!passwordRepeat.length < 8 || !passwordRepeat.length > 255){
        errores.push("La la repeticion de Contraseña esta fuera de rango, no tiene entre 8 y 255 caracteres");

    }
    if(clave != passwordRepeat){
        errores.push("Las contraseñas no coinciden.");
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