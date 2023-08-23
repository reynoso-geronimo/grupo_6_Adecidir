document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.formAdd')
    const categoriasSelect = document.getElementById('categorias')
  
    // esto quedo medio raro (en breve lo arreglo) 
    categoriasSelect.addEventListener('change', () => {
      if (categoriasSelect.value === '') {
        categoriasSelect.classList.add('default-option')
      } else {
        categoriasSelect.classList.remove('default-option')
      }
    }) 
  
  
    form.addEventListener('submit', (event) => {
      event.preventDefault()
  
      const errorMessages = document.querySelectorAll('.error-message')
      errorMessages.forEach(span => span.textContent = '')

      // para llamarlos abajo 
      const nombre = document.getElementById('nombre').value
      const precio = document.getElementById('precio').value
      const descripcion= document.getElementById('descripcion').value
      const talleS = parseInt(document.getElementById('talleS').value)
      const talleM = parseInt(document.getElementById('talleM').value)
      const talleL = parseInt(document.getElementById('talleL').value)
      const talleXL = parseInt(document.getElementById('talleXL').value)
      const talleXXL = parseInt(document.getElementById('talleXXL').value)
      const idCategoria = document.getElementById('categorias').value
      const imagenes = document.querySelector('.input-img-crear').files
  
  
      let errores = []
      //nombre (vacio y 5 caract.)
      if (!nombre) {
        errores.push({ campo: 'nombre', mensaje: 'El nombre del producto es obligatorio.'})
      } else {
        if (nombre.length < 5) {
          errores.push({campo: 'nombre', mensaje: 'El nombre debe tener al menos 5 caracteres.' })
        }
      }

      // precio vacio 
      if (!precio) {
        errores.push({ campo: 'precio', mensaje: 'El precio del producto es obligatorio.' })
      }

      // descripcion vacia y 20 caract. 
       if (!descripcion) {
        errores.push({ campo: 'descripcion', mensaje: 'La descripcion del producto es obligatoria.' })
      } else {
        if (descripcion.length <= 20) {
          errores.push({campo: 'descripcion', mensaje: 'La descripcion debe ser mayor a 20 caracteres' })
        }
      }
      
      // talles negativos 
      if (talleS < 0 || talleM < 0 || talleL < 0 || talleXL < 0 || talleXXL < 0) {
        errores.push({ campo: 'talles', mensaje: 'Los talles deben ser enteros no negativos.' })
      }

      // categorias 
      if (!idCategoria) {
        categoriasSelect.classList.add('default-option')
      } else {
        categoriasSelect.classList.remove('default-option')
      }
      // imagenes 
      if (imagenes.length === 0) {
        errores.push({ campo: 'imagenes', mensaje: 'Debes cargar al menos una imagen.'})
      } else if (imagenes.length > 5) {
        errores.push({ campo: 'imagenes', mensaje: 'No puedes cargar más de 5 imágenes.'})
      }
    
  
      if (errores.length > 0) {
        errores.forEach(error => {
          const campo = error.campo
          const mensaje = error.mensaje
          const errorSpan = document.getElementById(`error-${campo}`)
          errorSpan.textContent = mensaje
        })
      } else {
        form.submit()
      }
    })
  })