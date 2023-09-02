window.addEventListener("load", () => {
  let talle = document.querySelector(".editar-talle")
  let switchTalle = document.querySelector("#switchTalle")

  switchTalle.addEventListener("change", (e) => {
    if (e.currentTarget.checked) {
      talle.innerHTML = `
        <label for="talles">Unidades <input type="number" id="talleUnico" name="talleUnico" value="0" /></label>
      `
    } else {
      talle.innerHTML = `
        <label for="talles">S <input type="number" id="talleS" name="talles" value="0" /></label>
        <label for="tallem">M <input type="number" id="talleM" name="tallem" value="0" /></label>
        <label for="tallel">L <input type="number" id="talleL" name="tallel" value="0" /></label>
        <label for="tallexl">XL <input type="number" id="talleXL" name="tallexl" value="0" /></label>
        <label for="tallexxl">XXL <input type="number" id="talleXXL" name="tallexxl" value="0" /></label>
      `
    }
  })

  const form = document.querySelector('.formAdd')
  const categoriasSelect = document.getElementById('categorias')
  const errorMessages = document.querySelectorAll('.error-message')

    // listo, ya arregle esto
  categoriasSelect.addEventListener('change', () => {
    const defaultOption = categoriasSelect.querySelector('option[value=""]')
    if (categoriasSelect.value === '') {
      categoriasSelect.classList.add('default-option')
    } else {
      categoriasSelect.classList.remove('default-option')
      if (defaultOption) {
        defaultOption.disabled = true
      }
    }
  })

  // form.addEventListener('submit', (event) => {
  //   event.preventDefault()

  //   errorMessages.forEach(span => span.textContent = '')

  //   const nombre = document.getElementById('nombre').value
  //   const precio = document.getElementById('precio').value
  //   const descripcion = document.getElementById('descripcion').value
  //   const idCategoria = document.getElementById('categorias').value
  //   const imagenes = document.querySelector('.input-img-crear').files
  //   let errores = []

  //   if (!nombre) {
  //     errores.push({ campo: 'nombre', mensaje: 'El nombre del producto es obligatorio.'})
  //   } else {
  //     if (nombre.length < 5) {
  //       errores.push({ campo: 'nombre', mensaje: 'El nombre debe tener al menos 5 caracteres.' })
  //     }
  //   }

  //   if (!precio) {
  //     errores.push({ campo: 'precio', mensaje: 'El precio del producto es obligatorio.' })
  //   }

  //   if (!descripcion) {
  //     errores.push({ campo: 'descripcion', mensaje: 'La descripcion del producto es obligatoria.' })
  //   } else {
  //     if (descripcion.length <= 20) {
  //       errores.push({ campo: 'descripcion', mensaje: 'La descripcion debe ser mayor a 20 caracteres' })
  //     }
  //   }

  //   if (!switchTalle.checked) {
  //     const talleS = parseInt(document.getElementById('talleS').value)
  //     const talleM = parseInt(document.getElementById('talleM').value)
  //     const talleL = parseInt(document.getElementById('talleL').value)
  //     const talleXL = parseInt(document.getElementById('talleXL').value)
  //     const talleXXL = parseInt(document.getElementById('talleXXL').value)

  //     if (talleS < 0 || talleM < 0 || talleL < 0 || talleXL < 0 || talleXXL < 0) {
  //       errores.push({ campo: 'talles', mensaje: 'Los talles deben ser enteros no negativos.' })
  //     }
  //   } else {
  //     const talleUnico = parseInt(document.getElementById('talleUnico').value)

  //     if (talleUnico < 0) {
  //       errores.push({ campo: 'talleUnico', mensaje: 'El talle único debe ser un número entero no negativo.' })
  //     }
  //   }

  //   if (!idCategoria) {
  //     categoriasSelect.classList.add('default-option')
  //   } else {
  //     categoriasSelect.classList.remove('default-option')
  //   }

  //   if (imagenes.length === 0) {
  //     errores.push({ campo: 'imagenes', mensaje: 'Debes cargar al menos una imagen.' })
  //   } else if (imagenes.length > 5) {
  //     errores.push({ campo: 'imagenes', mensaje: 'No puedes cargar más de 5 imágenes.' })
  //   }

  //   if (errores.length > 0) {
  //     errores.forEach(error => {
  //       const campo = error.campo
  //       const mensaje = error.mensaje
  //       const errorSpan = document.getElementById(`error-${campo}`)
  //       errorSpan.textContent = mensaje
  //     })
  //   } else {
  //     form.submit()
  //   }
  // })
})