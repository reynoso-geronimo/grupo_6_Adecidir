let formularioLogin = document.querySelector("#formularioLogin");
formularioLogin.onsubmit= ()=>{
    const email = formularioLogin.querySelector('input[name="email"]');
    const password = document.querySelector('input[name="password"]');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    existeError=false;

    if(email.value.length < 8 || email.value.length > 255){
        email.insertAdjacentHTML('afterend', '<p>El Email debe tener entre 8 y 255 caracteres</p>');
        existeError=true;
    }
    if(!emailRegex.test(email.value)){
        email.insertAdjacentHTML('afterend', '<p>El Email dene tener formato de correo electronico.</p>');
        existeError=true;

    }
    if(password.value.length < 8 || password.value.length > 255){
        password.insertAdjacentHTML('afterend', '<p>La Contraseña debe tener entre 8 y 255 caracteres</p>');
        existeError=true;
    }

    if(existeError){
        event.preventDefault();
     }
    
}