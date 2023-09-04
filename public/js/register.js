let formularioRegistro = document.querySelector("#formularioRegistro");
formularioRegistro.onsubmit= (event)=>{
    event.preventDefault()
    let nombre = document.querySelector("#nombre");
    let apellido = document.querySelector("#apellido");
    let email = document.querySelector("#email");
    let clave = document.querySelector("#clave");
    let passwordRepeat = document.querySelector("#passwordRepeat");

    let errores = [];
    if(nombre.value.length <= 1 ){
        errores.push("El nombre es un campo obligatorio.");
    }
    if(apellido.value.length <= 1 ){
        errores.push("El apellido es un campo obligatorio.");
    }
    if(email.value.length < 8 || email.length > 255){
        errores.push("El Email esta fuera de rango, no tiene entre 8 y 255 caracteres");
    }
    if(!email.value.includes("@") || !email.includes(".")){
        errores.push("El Email no tiene el formato de correo electrónico (ejemplo: sara@gmail.com).");

    }
    if(clave.value.length < 8 || clave.length > 255){
        errores.push("La primera contraseña esta fuera de rango, no tiene entre 8 y 255 caracteres");
    }
    if(!passwordRepeat.value.length < 8 || !passwordRepeat.length > 255){
        errores.push("La la repeticion de Contraseña esta fuera de rango, no tiene entre 8 y 255 caracteres");

    }
    if(clave.value != passwordRepeat.value){
        errores.push("Las contraseñas no coinciden.");
    }

    if(errores.length > 0){
        
        let signIn = document.querySelector(".body-register");
        console.log(signIn)
        signIn.innerHTML+= '<div class="errores">';
        errores.forEach(error=>{
            console.log(error)
            signIn.innerHTML+= `<p>${error}</p>`;
        });
        signIn.innerHTML+= '</div">';

    }
    
}