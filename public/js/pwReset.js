window.addEventListener('load',function(){
    const boton = document.querySelector('.boton-negro')
    boton.addEventListener('click',function () {
        Swal.fire('Se enviara un link para recuperar tu usuario si el correo es correcto')
            .then(function() {
                window.location = "/"
            })

    })
    
    

})

let pwReset = document.querySelector("#pwReset");
pwReset.onsubmit= ()=>{
    let email = document.querySelector("input.email");
    let errores = [];
    if(email.length < 8 || email.length > 255){
       errores.push("El Email esta fuera de rango, no tiene entre 8 y 255 caracteres");
    }
    if(!email.includes("@") || !email.includes(".")){
       errores.push("El Email no tiene el formato de correo electrónico ejemplo: sara@gmail.com");

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