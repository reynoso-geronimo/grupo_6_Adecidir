window.addEventListener("load",()=>{
    let talle = document.querySelector(".editar-talle")
    let switchTalle = document.querySelector("#switchTalle")
    switchTalle.addEventListener("change",(e)=>{
        if(e.currentTarget.checked){
            talle.innerHTML=`
            <label for="talles">Unidades <input type="number" id="talleUnico" name="talleUnico" value="0" /></label>   
            `
        }else{
            talle.innerHTML=`
            <label for="talles">S <input type="number" id="talleS" name="talles" value="0" /></label>
            <label for="tallem">M <input type="number" id="talleM" name="tallem" value="0" /></label>
            <label for="tallel">L <input type="number" id="talleL" name="tallel" value="0" /></label>
            <label for="tallexl">XL <input type="number" id="talleXL" name="tallexl" value="0" /></label>
            <label for="tallexxl">XXL <input type="number" id="talleXXL" name="tallexxl" value="0" /></label>
            `
        }
    })
   
})