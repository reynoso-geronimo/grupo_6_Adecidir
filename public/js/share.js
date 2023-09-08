document.addEventListener("DOMContentLoaded", function () {
    const shareButton = document.getElementById("copyLink")

    shareButton.addEventListener("click", function () {
        
        shareButton.classList.add("clicked")

        
        var currentURL = window.location.href.split('#')[0]

        // gracias google
        var tempInput = document.createElement("input")
        tempInput.setAttribute("value", currentURL)
        document.body.appendChild(tempInput)
        tempInput.select()
        document.execCommand("copy")
        document.body.removeChild(tempInput)

       
        setTimeout(function () {
            shareButton.classList.remove("clicked")
        }, 2000);
    })
})

const toastify = document.getElementById('copyLink')
toastify.addEventListener('click', ()=> {
    Toastify({
        text: "Enlace Copiado",
        className: "share",
        duration: 2000,
        destination: false,
        newWindow: true,
        close: false,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
})