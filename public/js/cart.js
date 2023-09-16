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
      checkout.style.backgroundColor = 'white';
       if(carritoStorage.length==0){
        
          carrito.innerHTML = `<h1>No hay items en el carrito </h1>`
          checkout.innerHTML = ``
          checkout.style.backgroundColor = 'white';
          checkout.style.border = 'none';
          //checkout.remove()
       }else{
        const consultaDb = await consultarProductosDB(items)
        carrito.innerHTML = ``
        checkout.innerHTML = ``
       
        let total = 0
        let index = 0
        for (const item of consultaDb) {
            total += (item.precio*item.cantidad)
            carrito.innerHTML+= `
            <article class="carrito">
            <div>
              <img src="../images/productos/${item.imagen}" alt="producto" class="img-prod-cart" />
            </div>
            <div class="detalles-producto">
              <div>
                <h4>${item.nombre}</h4>
                <p>Talle: ${item.talle.toUpperCase()}</p>
                <p>Unidades: ${item.cantidad}</p>
                <p>Precio: $${item.precio*item.cantidad}</p>
              </div>
              <div class="producto-carrito-cantidad"><i class="fa-solid fa-minus"></i><div id="cantidad">${item.cantidad}</div><i class="fa-solid fa-plus"></i></div>
              <div><i id="${index}" class="fa-solid fa-trash"></i></div>
            </div>
          </article>
            `
          index++
        }
        
        checkout.innerHTML = `
        <p>Total: $ ${total}</p>
        <button class="boton-negro invertido" id="home">Seguir Comprando</button>
        <button id="checkout" class="boton-negro">Comprar Carrito</button>`
        checkout.style.backgroundColor = 'rgba(165, 165, 165, 80%)';
       }
  
       botonesProducto()
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


