const selectUsuario = document.getElementById("usuario")
const avatarUsuario = document.getElementById("avatarUsuario")

selectUsuario.addEventListener("change", () => {
  const selectedOption = selectUsuario.options[selectUsuario.selectedIndex]
  const avatarPath = selectedOption.getAttribute("data-avatar")
  avatarUsuario.src = `/../images/avatar/${avatarPath}`
});
