function getUser(user, language) {
  if (user.value != '' && language.value != 0) {
    clearContainer()

    let urlUser = `https://api.github.com/users/${user.value}`
    fetch(urlUser)
      .then((res) => res.json())
      .then((res) => {
        if (res.login) {
          let urlRepos = `https://api.github.com/users/${user.value}/repos`
          getRepos(urlRepos, user.value, language.value)
        } else {
          alert(`\nNo se encontro al usuario: ${user.value} `)
        }
      })
  } else alert('\nLos datos no son correctos.')
}

function getRepos(url, userGit, language) {
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((repositorios) => {
      let contenedor = document.getElementById('contentRepos')
      let user = document.createElement('h2')
      user.textContent = userGit
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
