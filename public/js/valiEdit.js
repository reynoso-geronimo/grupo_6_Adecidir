window.addEventListener("load", () => {
    let switchTalle = document.querySelector("#switchTalle")
  
    switchTalle.addEventListener("change", (e) => {
        const talle = document.querySelector(".editar-talle");
        if (e.currentTarget.checked) {
          talle.innerHTML = `
            <label for="talles">Unidades <input type="number" id="talleUnico" name="talleUnico" value="0" /></label>
          `;
        } else {
          talle.innerHTML = `
            <label for="talles">S <input type="number" id="talleS" name="talleS" value="0" /></label>
            <label for="tallem">M <input type="number" id="talleM" name="talleM" value="0" /></label>
            <label for="tallel">L <input type="number" id="talleL" name="talleL" value="0" /></label>
            <label for="tallexl">XL <input type="number" id="talleXL" name="talleXL" value="0" /></label>
            <label for="tallexxl">XXL <input type="number" id="talleXXL" name="talleXXL" value="0" /></label>
          `;
        }
      });
  
    const form = document.querySelector('.formEdit')
        form.addEventListener('submit', (event) => {
      event.preventDefault()
      limpiarErrores()
  
      const nombre = document.getElementById('nombre').value
      const precio = document.getElementById('precio').value
      const descripcion = document.getElementById('editDescripcion').value

      let errores = []

      
    
  
  
      if (!nombre) {
        errores.push({ campo: 'nombre', mensaje: 'El nombre del producto es obligatorio.' })
        mostrarError('nombre', 'El nombre del producto es obligatorio.')
      } else {
        if (nombre.length < 5) {
          errores.push({ campo: 'nombre', mensaje: 'El nombre debe tener al menos 5 caracteres.' })
          mostrarError('nombre', 'El nombre debe tener al menos 5 caracteres.')
        }
      }
  
      if (!precio) {
        errores.push({ campo: 'precio', mensaje: 'El precio del producto es obligatorio.' })
        mostrarError('precio', 'El precio del producto es obligatorio.')
      }
  
      if (!descripcion) {
        errores.push({ campo: 'descripcion', mensaje: 'La descripcion es obligatoria' })
        mostrarError('descripcion', 'La descripcion es obligatoria')
      } else {
        if (descripcion.length <= 20) {
          errores.push({ campo: 'descripcion', mensaje: 'La descripción debe tener al menos 20 caracteres.' })
          mostrarError('descripcion', 'La descripción debe tener al menos 20 caracteres.')
        }
      }
  
      if (!switchTalle.checked) {
        const talleS = parseInt(document.getElementById('talleS').value)
        const talleM = parseInt(document.getElementById('talleM').value)
        const talleL = parseInt(document.getElementById('talleL').value)
        const talleXL = parseInt(document.getElementById('talleXL').value)
        const talleXXL = parseInt(document.getElementById('talleXXL').value)
  
        if (talleS < 0 || talleM < 0 || talleL < 0 || talleXL < 0 || talleXXL < 0) {
          errores.push({ campo: 'talles', mensaje: 'Los talles deben ser enteros no negativos.' })
          mostrarError('talles', 'Los talles deben ser enteros no negativos.')
        }
      } else {
        const talleUnico = parseInt(document.getElementById('talleUnico').value)
  
        if (talleUnico < 0) {
          errores.push({ campo: 'talleUnico', mensaje: 'El talle único debe ser un número entero no negativo.' })
          mostrarError('talleUnico', 'El talle único debe ser un número entero no negativo.')
        }
      }
        
  
      if (errores.length === 0) {
        form.submit()
      }
    })

  
    // funciones para mostrar el error (msj) y para limpiar el mismo  
    function mostrarError(campo, mensaje) {
      const errorSpan = document.getElementById(`error-${campo}`)
      if (errorSpan) {
        errorSpan.textContent = mensaje
      }
    }
  
    function limpiarErrores() {
      const errorMessages = document.querySelectorAll('.error-message')
      errorMessages.forEach((errorSpan) => {
        errorSpan.textContent = ''
      })
    }
  })
    