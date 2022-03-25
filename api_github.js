function getUser(user, language) {
  clearContainer()
  let url = `https://api.github.com/users/${user.value}/repos`

  getRepos(url, language.value)
}

function getRepos(url, language) {
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((repositorios) => {
      let contenedor = document.getElementById('contentRepos')
      let user = document.createElement('h2')
      user.textContent = repositorios[0].owner.login
      contenedor.appendChild(user)

      repositorios.forEach((repositorio) => {
        if (repositorio.language === language) {
          let titulo = document.createElement('h3')
          let lenguaje = document.createElement('h6')
          let link = document.createElement('a')
          link.href = repositorio.html_url
          titulo.textContent = repositorio.name
          lenguaje.textContent = repositorio.language

          link.appendChild(titulo)
          link.appendChild(lenguaje)
          contenedor.appendChild(link)
        }
      })
    })
    .catch((err) => console.log(err))
}

function clearContainer() {
  let element = document.getElementById('contentRepos')
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
