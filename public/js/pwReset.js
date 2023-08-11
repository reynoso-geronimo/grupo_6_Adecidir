window.addEventListener('load',function(){
    const boton = document.querySelector('.boton-negro')
    boton.addEventListener('click',function () {
        Swal.fire('Se enviara un link para recuperar tu usuario si el correo es correcto')
            .then(function() {
                window.location = "/"
            })

    })
    
    

})