window.addEventListener("load", function () {
  //const radios = document.querySelectorAll('input[name="radios"]');
  // const imagesSelect = document.querySelectorAll(".img-detalle");

  // imagesSelect[0].style.display = "block";

  // radios.forEach(function (radio) {
  //   radio.addEventListener("change", function () {
  //     const selectedRadio = document.querySelector(
  //       'input[name="radios"]:checked'
  //     );
  //     for (let index = 0; index < imagesSelect.length; index++) {
  //       if (selectedRadio.id === "selector" + index) {
  //         imagesSelect[index].style.display = "block";
  //       } else {
  //         imagesSelect[index].style.display = "none";
  //       }
  //     }
  //   });
  // });

  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    effect : "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: false,
      slideShadows: false,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    autoHeight : true,
    autoplay : {
        delay : 3000,
        pauseOnMouseEnter : true,
        disableOnInteraction: true 
    },

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable : true,
      dynamicBullets:true, 
    },

    // Navigation arrows
    /*navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },*/

    // And if we need scrollbar
    /* scrollbar: {
      el: '.swiper-scrollbar',
    }, */
  });

  const slides = this.document.querySelectorAll('.swiper-slide')

  slides.forEach(slide => {
    slide.addEventListener("click",(e)=>{
      console.log(e.target.src)
      Swal.fire({
        showConfirmButton: false,
        showCloseButton: true,
        imageUrl: e.target.src,
        imageAlt: "Custom image",
        
    });
    })
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
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonColor:"#000000",
        confirmButtonText: 'Finalizar compra',
      
        cancelButtonText: 'Seguir comprando',
        allowOutsideClick: false,
        
      }).then((result)=>{
        if (result.isConfirmed){
          window.location.href= '/user/cart'
        }else{
          window.location.href= '/'
        }
      });
    } else {
      addCarrito.innerText = "Elige un talle";
    }
  });
});
