window.addEventListener('load',()=>{
   top
    if(!JSON.parse(localStorage.getItem('cart'))){
        localStorage.setItem('cart', JSON.stringify([
           

        ]))
    }
    let carritoStorage =JSON.parse(localStorage.getItem('cart'))

    let carrito =  document.querySelector("#productos")
    let checkout =  document.querySelector(".checkout")
    

    const consultarProductosDB = async function(productos){
      const resultado= await fetch('/product/cartitems',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(productos)
      })
      return resultado.json()
    }
    
    const generarCarrito = async function(items){
      checkout.innerHTML = `<div class="lds-dual-ring"></div>`
       if(carritoStorage.length==0){
          checkout.innerHTML = `<h1 style="text-align:center;">NO HAY ITEMS EN EL CARRITO. </h1>`
          checkout.style.border = 'none';
          carrito.innerHTML ='';
         

       }else{
        const consultaDb = await consultarProductosDB(items)
        carrito.innerHTML = ``
        checkout.innerHTML = ``
       
        let total = 0
        let index = 0
        let htmlImagenes = ""
        for (const item of consultaDb) {
            htmlImagenes = ""
            total += (item.precio*item.cantidad)
            item.imagenes.forEach(imagen => {
              htmlImagenes +=`<div class="swiper-slide"><img src="../images/productos/${imagen.nombre}" alt="producto" /></div>`
            });
            
            
            carrito.innerHTML += `
            <article class="carrito">
            
              <div class="swiper swiper-cart">

                <!-- Additional required wrapper -->
                <div class="swiper-wrapper">
                <!-- Slides --> 
                ${htmlImagenes}
                </div>

                <!-- If we need pagination -->
              
                <div class="swiper-pagination"></div>

                <!-- If we need navigation buttons -->
                <!-- <div class="swiper-button-prev"></div>-->
                <!--<div class="swiper-button-next"></div>-->

                <!-- If we need scrollbar -->
                <!-- <div class="swiper-scrollbar"></div> -->
              </div>
       
       
              <div class="detalles-producto">
                <div>
                  <h4>${item.nombre}</h4>
                  <p>Talle: ${item.talle.toUpperCase()}</p>
                  <p>Unidades: ${item.cantidad}</p>
                  <p>Precio: $${item.precio * item.cantidad}</p>
                </div>
                <div class="producto-carrito-cantidad"><i class="fa-solid fa-minus"></i><div id="cantidad">${
                  item.cantidad
                }</div><i class="fa-solid fa-plus"></i></div>
                <div><i id="${index}" class="fa-solid fa-trash"></i></div>
              </div>
            </article>
            `;
          index++
        }
        
        checkout.innerHTML = `
        <p>Total: $ ${total}</p>
        <button class="boton-negro invertido" id="home">Seguir Comprando</button>
        <button id="checkout" class="boton-negro" >Finalizar compra</button>`
       }
  
       botonesProducto()
       const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        effect : "fade",
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
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    
        // And if we need scrollbar
        /* scrollbar: {
          el: '.swiper-scrollbar',
        }, */
      });
    }
    
    generarCarrito(carritoStorage)

    function botonesProducto() {
      const botonEliminar = document.querySelectorAll('.fa-trash');
      const botonMas = document.querySelectorAll('.fa-plus');
      const botonMenos = document.querySelectorAll('.fa-minus');
     

      botonEliminar.forEach((boton, index) => {
          boton.addEventListener('click', () => {
              
              carritoStorage.splice(index, 1);
              localStorage.setItem('cart', JSON.stringify(carritoStorage)); 
              generarCarrito(carritoStorage); 
          });
      });
      
      botonMas.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            carritoStorage[index].cantidad++
            localStorage.setItem('cart', JSON.stringify(carritoStorage)); 
              generarCarrito(carritoStorage); 
        });
    });
    botonMenos.forEach((boton, index) => {
      boton.addEventListener('click', () => {
          carritoStorage[index].cantidad--
          if(carritoStorage[index].cantidad==0){
            carritoStorage.splice(index, 1);
          }
          localStorage.setItem('cart', JSON.stringify(carritoStorage)); 
            generarCarrito(carritoStorage); 
      });
  });
  }

  

  botonesProducto();

 
})


