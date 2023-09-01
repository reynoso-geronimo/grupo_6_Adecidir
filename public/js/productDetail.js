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
  let carritoStorage = [];
  const carritoInit = function () {
    if (!JSON.parse(localStorage.getItem("cart"))) {
      localStorage.setItem("cart", JSON.stringify(carritoStorage));
    } else {
      carritoStorage = JSON.parse(localStorage.getItem("cart"));
    }
  };
  carritoInit();

  const addCarrito = document.querySelector("#addCart");
  addCarrito.addEventListener("click", () => {
    const selectedTalle = document.querySelector('input[name="talle"]:checked');
    const idRegExp = /\/product\/(\d+)/;
    const id = window.location.href.match(idRegExp);
    if (selectedTalle) {
      const producto = {
        id: id[1],
        talle: selectedTalle.value,
        cantidad: 1,
      };
      const productoEnCarrito = carritoStorage.find(
        itemsEnCarrito =>
          itemsEnCarrito.id === producto.id &&
          itemsEnCarrito.talle === producto.talle
      );

      if (productoEnCarrito) {
        productoEnCarrito.cantidad += producto.cantidad;
      } else {
        carritoStorage.push(producto);
      }
      localStorage.setItem("cart", JSON.stringify(carritoStorage));
      Swal.fire({
        title: "<strong>Producto agregado al carrito</strong>",
        // icon: "info",
        html:
          // "You can use <b>bold text</b>, " +
          // '<a href="//sweetalert2.github.io">links</a> ' +
          // "and other HTML tags",
          "",
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: true,
        confirmButtonText: '<a href="/user/cart">Finalizar compra</a>',
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: '<a href="/">Seguir comprando</a>',
        cancelButtonAriaLabel: "Thumbs down",
      });
    } else {
      addCarrito.innerText = "Elige un talle";
    }
  });
});
