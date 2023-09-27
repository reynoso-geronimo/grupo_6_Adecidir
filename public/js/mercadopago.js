document.addEventListener('DOMContentLoaded',()=>{

    const detalleSelector= document.querySelectorAll('#prod-detalle')
    const ticketSelector= document.querySelector('#ticket-id').innerHTML
    
    let descripcionMP = ``

    detalleSelector.forEach(element => {
         descripcionMP += `${element.innerHTML}, `
     });
     descripcionMP = descripcionMP.slice(0, -2);
     const total = document.querySelector('#total-ticket')
    const orderData = {
        metadata:{id_ticket:ticketSelector},
        quantity: 1,
        description: descripcionMP,
        price: total.innerHTML,
        
      };

     //MERCADOPAGO///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //console.log(descripcionMP )

 // Add SDK credentials
 // REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
 const mp = new MercadoPago('TEST-663dcb1f-01f5-4180-9b05-2a7e26db563d', {
    locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
  });
 
  async function prefence() {
    
    const crearPreferencia = await fetch("/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
    const result = await crearPreferencia.json()
   
    mp.bricks().create("wallet", "wallet_container", {
      initialization: {
        preferenceId: result.id,
        redirectMode: "modal"
      },
    });
  }
  prefence()
 
 
 
 
 
 
  //FIN MERCADOPAGO///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
})