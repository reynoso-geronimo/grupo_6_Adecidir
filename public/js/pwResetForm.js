const PwResetForm = document.querySelector("#PwResetForm");
PwResetForm.onsubmit= (event)=>{
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
    
    errores===0?formularioRegistro.submit():null
}