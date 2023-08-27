window.addEventListener('load',()=>{
   
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
        headers: {
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify(productos)
      })
      return resultado.json()
    }

    const generarCarrito = async function(items){
     
       if(carritoStorage.length==0){
          
          carrito.innerHTML += `<h1>No hay items en el carrito </h1>`
        
       }else{
        const consultaDb = await consultarProductosDB(items)
        carrito.innerHTML = ``
        checkout.innerHTML = ``
        let total = 0
        for (const item of consultaDb) {
            total += item.precio
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
                <p>Precio: $${item.precio}</p>
              </div>
              <div><a href="#">Guardar</a><i class="fa-solid fa-trash"></i></div>
            </div>
          </article>
            `

        }
        checkout.innerHTML = `
        <p>Total: $ ${total}</p>
        <button class="boton-negro invertido">Seguir Comprando</button>
        <button class="boton-negro">Comprar Carrito</button>`
       }
    
    }
    generarCarrito(carritoStorage)
})