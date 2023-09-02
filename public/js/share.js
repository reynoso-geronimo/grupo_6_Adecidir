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
