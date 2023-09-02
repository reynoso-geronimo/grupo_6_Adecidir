function previewImages(event) {
    const imagePreview = document.getElementById('imagePreview')
    const fileInput = event.target
  
    
    imagePreview.innerHTML = ''
  
    if (fileInput.files) {
      for (const file of fileInput.files) {
        const reader = new FileReader()
  
        reader.onload = function (e) {
          
          const img = document.createElement('img')
          img.src = e.target.result
  
          
          imagePreview.appendChild(img)
        };
  
        
        reader.readAsDataURL(file)
      }
    }
  }
  
