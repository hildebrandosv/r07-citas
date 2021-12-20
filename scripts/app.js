
let idCitasContainer = document.getElementById('idCitasContainer')
let formulario = document.getElementById('formulario')
let listarCita = document.getElementById('listarCita')
let idBtnLimpiar = document.getElementById('idBtnLimpiar')

let idFormularioLogin = document.getElementById('idFormularioLogin')
let idLoginContainer = document.getElementById('idLoginContainer')
let btnAcceder = document.getElementById('btnAcceder')

let idRegistrarseContainer = document.getElementById('idRegistrarseContainer')
let btnRegistrase = document.getElementById('btnRegistrase')
let btnCancelar = document.getElementById('btnCancelar')

let buscar = document.getElementById('btnBuscar')
let busqueda = document.getElementById('busqueda')

let citas = JSON.parse(localStorage.getItem('Citas')) || []
let usuarios = JSON.parse(localStorage.getItem('Usuarios')) || []

const capturarDatos = () => {
   let nombre = document.getElementById('nombre').value
   let fecha = document.getElementById('fecha').value
   let hora = document.getElementById('hora').value
   let sintomas = document.getElementById('sintomas').value

   let registro = {
      nombre,
      hora,
      fecha,
      sintomas
   }
   citas.unshift(registro)
   localStorage.setItem('Citas', JSON.stringify(citas))
   getLocalStorage()
}

const getLocalStorage = () => {
   listarCita.innerHTML = ''
   let citasLocalStorage = JSON.parse(localStorage.getItem('Citas'))
   citasLocalStorage?.map(cita => {
      const { nombre, fecha, hora, sintomas } = cita
      listarCita.innerHTML += `
            <tr>
               <td>${nombre}</td>
               <td>${fecha}</td>
               <td>${hora}</td>
               <td>${sintomas}</td>
            </tr>
      `
   })
}

document.addEventListener('DOMContentLoaded', e => {
   e.preventDefault()
   idCitasContainer.classList.add('d-none')
   idRegistrarseContainer.classList.add('d-none')
   idBtnLimpiar.classList.add('d-none')
   // getLocalStorage()
})

formulario.addEventListener('submit', e => {
   e.preventDefault()
   capturarDatos()
   e.target.reset()
})

btnAcceder.addEventListener('click', e => {
   e.preventDefault()
   capturarDatosLogin()
})

btnRegistrase.addEventListener('click', e => {
   e.preventDefault()
   let usuario = document.getElementById('idUsuario').value
   let contrasena = document.getElementById('idContrasena').value
   let registroUsuario = {
      usuario,
      contrasena
   }
   const usuariosLocalStorage = JSON.parse(localStorage.getItem('Usuarios')) || []
   usuariosLocalStorage.push(registroUsuario)
   localStorage.setItem('Usuarios', JSON.stringify(usuariosLocalStorage))
   idRegistrarseContainer.classList.add('d-none')
   btnAcceder.classList.remove('d-none')
   idFormularioLogin.reset()
})

btnCancelar.addEventListener('click', e => {
   e.preventDefault()
   idRegistrarseContainer.classList.add('d-none')
   btnAcceder.classList.remove('d-none')
   idFormularioLogin.reset()
})

const capturarDatosLogin = () => {
   let usuario = document.getElementById('idUsuario').value
   let contrasena = document.getElementById('idContrasena').value
   const usuariosLocalStorage = JSON.parse(localStorage.getItem('Usuarios')) || []
   const indice = usuariosLocalStorage.findIndex(elemento => elemento.usuario.toLowerCase() === usuario.toLowerCase());
   if (usuario.length > 0 && contrasena.length > 0) { // Digitó usuario y contraseña
      if (indice >= 0) { // Existe
         if (usuariosLocalStorage[indice].contrasena === contrasena) {  // La contraseña coincide
            idLoginContainer.classList.add('d-none')
            idCitasContainer.classList.remove('d-none')
            getLocalStorage()
         } else { // La contraseña NO es correcta
            alert("Datos incorrectos: El usuario o la contraseña son incorrectos.")
         }
      } else {  // No existe y se crea
         btnAcceder.classList.add('d-none')
         idRegistrarseContainer.classList.remove('d-none')
      }
   } else { // Está en blanco el usuario o la contraseña
      alert("Datos incorrectos: Debe digitar usuario y contraseña.")
   }

}

buscar.addEventListener('click', e => {
   e.preventDefault()
   let i = 0;
   let input = document.getElementById('inputBuscar').value
   let data = JSON.parse(localStorage.getItem('Citas'))
   let filtro = data.filter(cita => cita.nombre.toLowerCase() === input.toLowerCase())
   busqueda.innerHTML = ""
   filtro.length === 0
      ?
      busqueda.innerHTML = `<div style="color:white;">El nombre no existe</div>`
      :
      filtro.map(cita => {
         const { nombre, fecha, hora, sintomas } = cita
         busqueda.innerHTML += `
      <div id="nombre${i}" style="color:white;">${nombre}</div>
      <div style="color:white;">${fecha}</div>
      <div style="color:white;">${hora}</div>
      <div style="color:white;">${sintomas}
         <button id="btn${i}" class="btn btn-primary">Borrar</button>
      </div>
      <br>
      `
         i += 1
      })
})

inputBuscar.addEventListener('input', () => {
   console.log("aquí...",inputBuscar.value)
   if (inputBuscar.value.length >0) {
      idBtnLimpiar.classList.remove('d-none')
   }
   else {
      idBtnLimpiar.classList.add('d-none')
   }

})

idBtnLimpiar.addEventListener('click', e => {
   e.preventDefault()
   inputBuscar.value= ""
   busqueda.innerHTML = ""
   idBtnLimpiar.classList.add('d-none')
})

const borrar = busqueda.addEventListener('click', e => {
   e.preventDefault
   const nombreParaBorrar = document.getElementById('nombre0').innerHTML
   const citasLocalStorage = JSON.parse(localStorage.getItem('Citas'))
   const lasCitasActuales = JSON.parse(localStorage.getItem('Citas'))
   const indice = lasCitasActuales.findIndex(cita => cita.nombre === nombreParaBorrar);
   lasCitasActuales.splice(indice, 1)
   localStorage.setItem('Citas', JSON.stringify(lasCitasActuales))
   getLocalStorage()
})