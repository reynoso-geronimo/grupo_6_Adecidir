window.addEventListener('load',function (){
    const radios = document.querySelectorAll('input[name="radios"]');
    const imagesSelect = document.querySelectorAll(".img-detalle");
    
    imagesSelect[0].style.display = "block";
    
    radios.forEach(function (radio) {
      radio.addEventListener("change", function () {
        const selectedRadio = document.querySelector('input[name="radios"]:checked');
        for (let index = 0; index < imagesSelect.length; index++) {
          if (selectedRadio.id === "selector" + index) {
            imagesSelect[index].style.display = "block";
          } else {
            imagesSelect[index].style.display = "none";
          }
        }
      });
    });

})
