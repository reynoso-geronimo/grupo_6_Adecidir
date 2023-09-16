window.addEventListener("load", () => {
  let carritoStorage = JSON.parse(localStorage.getItem("cart"));

  const checkout = document.querySelector(".checkout");
  checkout.addEventListener("click", async () => {
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
        allowOutsideClick: false,
        confirmButtonColor:"#000000",
      });
    } else {
    localStorage.setItem("cart", JSON.stringify([]));
      Swal.fire({
        title: "Gracias por tu compra!",
        icon: "success",
        allowOutsideClick: false,
        confirmButtonColor:"#000000",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href='/'
        }
      })
    }
  });
});
