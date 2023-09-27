document.addEventListener('DOMContentLoaded',()=>{
    const submit = document.querySelector('#suscribeForm')
    submit.addEventListener('click',(e)=>{
        e.preventDefault()
        Swal.fire({
            title: "Gracias por suscribirte a nuestras noticias",
            allowOutsideClick: true,
            showConfirmButton: true,
            confirmButtonColor: "#000000"
          });
    })
})