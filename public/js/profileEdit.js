const formularioEdicionPerfil = document.querySelector("#formularioEdicionPerfil");
formularioEdicionPerfil.onsubmit= (e)=>{
    e.preventDefault()
    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector("#apellido");
    const direccion = document.querySelector("#direccion");
    const telefono = document.querySelector("#telefono");
    let errores = 0 
    
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
   
    if(direccion.value.length <= 1 ){
        errores ++
        document.querySelector('#error-direccion').innerText="La direccion es un campo obligatorio." 
    }else{
        document.querySelector('#error-direccion').innerText=""
    }

    if(telefono.value.length <= 1 ){
        errores ++
        document.querySelector('#error-telefono').innerText="El telefono es un campo obligatorio." 
    }else{
        document.querySelector('#error-telefono').innerText=""
    }
    
    
    errores===0?formularioEdicionPerfil.submit():null
}