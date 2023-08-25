window.addEventListener("load", function () {
  const radios = document.querySelectorAll('input[name="radios"]');
  const imagesSelect = document.querySelectorAll(".img-detalle");

  imagesSelect[0].style.display = "block";

  radios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      const selectedRadio = document.querySelector(
        'input[name="radios"]:checked'
      );
      for (let index = 0; index < imagesSelect.length; index++) {
        if (selectedRadio.id === "selector" + index) {
          imagesSelect[index].style.display = "block";
        } else {
          imagesSelect[index].style.display = "none";
        }
      }
    });
  });

  // agregar items al carrito
  let carritoStorage = []
  const carritoInit = function () {
    
    if (!JSON.parse(localStorage.getItem("cart"))) {
      localStorage.setItem("cart", JSON.stringify(carritoStorage));
    } else {
      carritoStorage = JSON.parse(localStorage.getItem("cart"));
    }
  };
  carritoInit()

  const addCarrito = document.querySelector("#addCart")
  addCarrito.addEventListener("click",()=>{
    const selectedTalle = document.querySelector('input[name="talle"]:checked');
    const idRegExp = /\/product\/(\d+)/;
    const id = window.location.href.match(idRegExp);
    if(selectedTalle){
      carritoStorage.push({
        id:id[1],
        talle:selectedTalle.value,
      })
      localStorage.setItem("cart", JSON.stringify(carritoStorage));
    }else{
      addCarrito.innerText="Elige un talle"
    }
  })
 
});
