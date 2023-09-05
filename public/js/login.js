const formularioLogin = document.querySelector("#formularioLogin");
formularioLogin.onsubmit= ()=>{
    const email = formularioLogin.querySelector('input[name="email"]');
    const password = document.querySelector('input[name="password"]');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    existeError=false;

    if(!emailRegex.test(email.value)){
        email.nextSibling.innerHTML="";
        email.insertAdjacentHTML('afterend', '<span class="error-message">El Email dene tener formato de correo electronico.</span>');
        existeError=true;
    }else{
        email.nextSibling.innerHTML="";
    }
    if(password.value.length < 8 || password.value.length > 255){
        password.nextSibling.innerHTML="";
        password.insertAdjacentHTML('afterend', '<span class="error-message">La Contraseña debe tener entre 8 y 255 caracteres</span>');
        existeError=true;
    }else{
        password.nextSibling.innerHTML="";
    }

    if(existeError){
        event.preventDefault();
     }
    
}