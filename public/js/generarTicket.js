window.addEventListener("load",()=>{
    let carritoStorage =JSON.parse(localStorage.getItem('cart'))


    const checkout = document.querySelector(".checkout")
    checkout.addEventListener("click",async ()=>{
        const resultado= await fetch('/user/api/ticket',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(carritoStorage)
          })
          const ticket = await resultado.json()
          console.log(ticket)
          return ticket
        
    })
    
})