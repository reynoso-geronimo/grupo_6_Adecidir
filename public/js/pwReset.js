window.addEventListener('load',function(){
    
    
    const pwResetForm = document.querySelector("#pwReset");
    pwResetForm.onsubmit= (event)=>{
    event.preventDefault()
   
    const email = document.querySelector("#email");
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let errores = 0;

    if (!emailRegex.test(email.value)) {
        errores++;
        document.querySelector('#error-email').innerText = "Ingresa un email con formato válido";
    } else {
        document.querySelector('#error-email').innerText = "";
    }
    

    if(errores===0){
        pwResetForm.submit()
        Swal.fire('Se enviara un link para recuperar tu usuario si el correo es correcto')
            .then(function() {
                window.location = "/"
            })

    
    }
}

})

