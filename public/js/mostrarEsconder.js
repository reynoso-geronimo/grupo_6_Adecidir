const toggleButton = document.getElementById("toggleTickets")


let ticketsVisible = true


toggleButton.addEventListener("click", () => {
  
  const ticketContainers = document.querySelectorAll(".ticket-container")

  ticketContainers.forEach((container) => {
    container.style.display = ticketsVisible ? "none" : "block"
  })
  toggleButton.textContent = ticketsVisible ? "Mostrar" : "Esconder"
  ticketsVisible = !ticketsVisible
})