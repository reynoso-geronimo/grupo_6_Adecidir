window.addEventListener('load', function () {
  const user = document.querySelector('#userIcon')
  const menuLogin = document.querySelector('.login-register')
  user.addEventListener('click', () => {
    menuLogin.classList.toggle('login-register-open')
    searchBar.classList.remove('search-bar-header-open')
  })
  const search = document.querySelector('.fa-magnifying-glass')
  const searchBar = document.querySelector('.search-bar-header')
  search.addEventListener('click', () => {
    searchBar.classList.toggle('search-bar-header-open')
    menuLogin.classList.remove('login-register-open')
  })
})
