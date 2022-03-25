import { Api } from "../models/Api.js"

const formLogin = document.querySelector("#formLogin")
const formCadastro = document.querySelector("#formCadastro")
const botaoLogin = document.querySelector("#botaoLogin")
const botaoCadastro = document.querySelector("#botaoCadastro")

const entrarLogin = document.querySelector("#formLogin")
const cadastrar = document.querySelector("#formCadastro")


class MostrarTelaUsuario {
  static mostrarLogin(){
    formLogin.style.display = "flex"
    formCadastro.style.display = "none"
    botaoCadastro.classList.remove("botaoSelecionado")
    botaoLogin.classList.add("botaoSelecionado")
  }
  static mostrarCadastro(){
    formLogin.style.display = "none"
    formCadastro.style.display = "flex"
    botaoCadastro.classList.add("botaoSelecionado")
    botaoLogin.classList.remove("botaoSelecionado")
  }
}

botaoLogin.addEventListener("click", MostrarTelaUsuario.mostrarLogin)
botaoCadastro.addEventListener("click", MostrarTelaUsuario.mostrarCadastro)


const logoKenzieFood = document.querySelectorAll(".KenzieFoodLogo")
const redirecionar = () => window.location.href = "../../index.html"

logoKenzieFood[0].addEventListener("click", redirecionar)
logoKenzieFood[1].addEventListener("click", redirecionar)

async function login(event){
  event.preventDefault()
  const inputs = this
  const valorInput = {}
  
  for (let i = 0; i < inputs.length; i++) {
    const {
      name: nome,
      value: valor} = inputs[i]
    if (nome) {
      valorInput[nome] = valor
    }
  }
  
  const sucesso = await Api.login(valorInput)
  if(sucesso){
    window.location.href = "../../../index.html"
  }
  
}

entrarLogin.addEventListener("submit", login.bind(formLogin))

function cadastro(event){
  event.preventDefault()
  const inputs = this
  const valorInput = {}
  
  for (let i = 0; i < inputs.length; i++) {
    const {name: nome, value: valor} = inputs[i]
    if (nome) {
      valorInput[nome] = valor
    }
  }
  let sucesso = Api.registrarUsuario(valorInput)
  if(sucesso){

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }
  }
}

cadastrar.addEventListener("submit", cadastro.bind(formCadastro))

