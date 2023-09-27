window.addEventListener("load", async () => {
 
  const checkout = document.querySelector(".checkout");
  checkout.addEventListener("click", async e => {
    switch (e.target.id) {
      case "home":
        window.location.href = "/";
        break;
      case "checkout":
       
        const processingSwal = Swal.fire({
          title: "Procesando...",
          allowOutsideClick: false,
          showConfirmButton: false,
        });

        try {
          let carritoStorage = JSON.parse(localStorage.getItem("cart"));

          const resultado = await fetch("/user/api/ticket", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carritoStorage),
          });

          const ticket = await resultado.json();

          if (resultado.status !== 201) {
            
            Swal.fire({
              icon: "error",
              title: ticket.mensaje,
              confirmButtonColor: "#000000",
            });
          } else {
           
            localStorage.setItem("cart", JSON.stringify([]));
           
            window.location.href = `/user/ticket/${ticket.ticket}`;
          }
        } catch (error) {
          console.log(error)
           
          Swal.fire({
            icon: "error",
            title: "Ocurrió un error al procesar la solicitud",
            confirmButtonColor: "#000000",
            
          });
        } finally {
         
          processingSwal.close();
        }
        break;
      default:
        break;
    }
  });
});