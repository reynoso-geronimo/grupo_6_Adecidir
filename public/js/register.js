const formularioRegistro = document.querySelector("#formularioRegistro");
formularioRegistro.onsubmit= (event)=>{
    event.preventDefault()
    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector("#apellido");
    const email = document.querySelector("#email");
    const clave = document.querySelector("#clave");
    const passwordRepeat = document.querySelector("#passwordRepeat");
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

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
    if (!emailRegex.test(email.value)) {
        errores++;
        document.querySelector('#error-email').innerText = "Ingresa un email con formato válido";
    } else {
        document.querySelector('#error-email').innerText = "";
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