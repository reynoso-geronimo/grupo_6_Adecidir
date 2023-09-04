let formularioRegistro = document.querySelector("#formularioRegistro");
formularioRegistro.onsubmit= (event)=>{
    event.preventDefault()
    let nombre = document.querySelector("#nombre");
    let apellido = document.querySelector("#apellido");
    let email = document.querySelector("#email");
    let clave = document.querySelector("#clave");
    let passwordRepeat = document.querySelector("#passwordRepeat");

    let errores = 0;
    if(nombre.value.length <= 1 ){
        errores ++
        document.querySelector('#error-nombre').innerText="El nombre es un campo obligatorio." 
    }else{
        document.querySelector('#error-nombre').innerText=""
    }
    if(apellido.value.length <= 1 ){
        errores ++
        document.querySelector('#error-apellido').innerText="El apellido es un campo obligatorio." 
    }else{
        document.querySelector('#error-apellido').innerText=""
    }
    if(email.value.length < 8 || email.length > 255){
        errores ++
        document.querySelector('#error-email').innerText="Ingresa un email con formato valido" 
    }else{
        document.querySelector('#error-email').innerText=""
    }
    if(clave.value.length < 8 || clave.length > 255){
        errores ++
        document.querySelector('#error-clave').innerText="Fuera de rango, no tiene entre 8 y 255 caracteres" 
    }else{
        document.querySelector('#error-clave').innerText=""
    }
    
    if(clave.value != passwordRepeat.value){
        errores ++
        document.querySelector('#error-claveRepeat').innerText="Las contraseñas no coinciden." 
    }else{
        document.querySelector('#error-claveRepeat').innerText=""
    }
    errores===0?formularioRegistro.submit():null
}