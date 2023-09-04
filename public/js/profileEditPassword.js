const pwEdit = document.querySelector("#pwEdit");
pwEdit.onsubmit= (event)=>{
    event.preventDefault()
   
    const clave = document.querySelector("#clave");
    const passwordNueva = document.querySelector("#passwordNueva");
    const passwordRepeat = document.querySelector("#passwordRepeat");
    let errores = 0

    if(clave.value.length < 8 || clave.length > 255){
        errores ++
        document.querySelector('#error-clave').innerText="Fuera de rango, no tiene entre 8 y 255 caracteres" 
    }else{
        document.querySelector('#error-clave').innerText=""
    }
    if(passwordNueva.value.length < 8 || passwordNueva.length > 255){
        errores ++
        document.querySelector('#error-claveNueva').innerText="Fuera de rango, no tiene entre 8 y 255 caracteres" 
    }else{
        document.querySelector('#error-claveNueva').innerText=""
    }
    if(passwordNueva.value != passwordRepeat.value){
        errores ++
        document.querySelector('#error-claveRepeat').innerText="Las contraseñas no coinciden." 
    }else{
        document.querySelector('#error-claveRepeat').innerText=""
    }
    errores===0?pwEdit.submit():null
    
    
}