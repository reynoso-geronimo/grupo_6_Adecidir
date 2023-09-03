let formularioLogin = document.querySelector("#formularioLogin");
formularioLogin.onsubmit= ()=>{
    let email = document.querySelector("input.email");
    let password = document.querySelector("input.password");
    let errores = [];
    if(email.length < 8 || email.length > 255){
        errores.push("El Email esta fuera de rango, no tiene entre 8 y 255 caracteres");
    }
    if(!email.includes("@") || !email.includes(".")){
        errores.push("El Email no tiene el formato de correo electrónico (ejemplo: sara@gmail.com).");

    }
    if(password.length < 8 || password.length > 255){
        errores.push("La Contraseña esta fuera de rango, no tiene entre 8 y 255 caracteres");
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