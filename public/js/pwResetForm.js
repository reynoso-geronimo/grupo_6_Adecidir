let PwResetForm = document.querySelector("#PwResetForm");
PwResetForm.onsubmit= ()=>{
    let newPassword = document.querySelector("input.newPassword");
    let newPasswordCheck = document.querySelector("input.newPasswordCheck");
    let errores = [];
    if(newPassword.length < 8 || newPassword.length > 255){
        errores.push("La primera contraseña esta fuera de rango, no tiene entre 8 y 255 caracteres");
    }
    if(!newPasswordCheck.length < 8 || !newPasswordCheck.length > 255){
        errores.push("La la repeticion de Contraseña esta fuera de rango, no tiene entre 8 y 255 caracteres");

    }
    if(newPassword != newPasswordCheck){
        errores.push("Las contraseñas no coinciden.");
    }

    if(errores.length > 0){
        event.preventDefault();
        let signIn = document.querySelector(".body-register .register");
        signIn+= '<div class="errores">';
        errores.forEach(error=>{
            signIn+= '<p>${error}</p>';
        });
        signIn+= '</div">';

    }
    
}