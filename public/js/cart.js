window.addEventListener('load',()=>{
   
    if(!JSON.parse(localStorage.getItem('cart'))){
        localStorage.setItem('cart', JSON.stringify([
           

        ]))
    }
    let carritoStorage =JSON.parse(localStorage.getItem('cart'))

    let carrito =  document.querySelector("#productos")
    let checkout =  document.querySelector(".checkout")
    let cantidadItems =  document.querySelector("#cantidadCarrito")

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
        cantidadItems.innerText = `Carrito(0)`
          carrito.innerHTML = `<h1>No hay items en el carrito </h1>`
          checkout.innerHTML = ``
          checkout.style.backgroundColor = 'white';
          checkout.style.border = 'none';
          //checkout.remove()
       }else{
        const consultaDb = await consultarProductosDB(items)
        carrito.innerHTML = ``
        checkout.innerHTML = ``
        cantidadItems.innerText = `Carrito(${consultaDb.length})`
        let total = 0
        let lugarEnArray = 0
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
              <div><i id="${lugarEnArray}" class="fa-solid fa-trash"></i></div>
            </div>
          </article>
            `
          lugarEnArray++
        }
        
        checkout.innerHTML = `
        <p>Total: $ ${total}</p>
        <button class="boton-negro invertido">Seguir Comprando</button>
        <button class="boton-negro">Comprar Carrito</button>`
       }
  
      cargarEliminar()
    }
    
    generarCarrito(carritoStorage)

    function cargarEliminar() {
      const botonEliminar = document.querySelectorAll('.fa-trash');

      botonEliminar.forEach((boton, index) => {
          boton.addEventListener('click', () => {
              
              carritoStorage.splice(index, 1);
              localStorage.setItem('cart', JSON.stringify(carritoStorage)); 
              generarCarrito(carritoStorage); 
          });
      });
  }

  cargarEliminar();
    
})


