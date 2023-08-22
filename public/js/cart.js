window.addEventListener('load',()=>{
   
    if(!JSON.parse(localStorage.getItem('cart'))){
        localStorage.setItem('cart', JSON.stringify([
           

        ]))
    }
    let carritoStorage =JSON.parse(localStorage.getItem('cart'))

    let carrito =  document.querySelector("#productos")

    const generarCarrito = function(items){
       if(carritoStorage.length==0){
            carrito.innerHTML += `<h1>No hay items en el carrito </h1>`
        
       }else{
        carrito.innerHTML = ``
        for (const item of carritoStorage) {
            carrito.innerHTML+= `
            <article class="carrito">
            <div>
              <img src="../images/buzo2.jpg" alt="producto" class="img-prod-cart" />
            </div>
            <div class="detalles-producto">
              <div>
                <h4>Buzo Modelo 1</h4>
                <p>S</p>
                <p>Negro</p>
                <p>Unidades : 1</p>
                <p>$30.000</p>
              </div>
              <div><a href="#">Guardar</a><i class="fa-solid fa-trash"></i></div>
            </div>
          </article>
            `
            
        }
       }
    
    }
    generarCarrito(carritoStorage)
})