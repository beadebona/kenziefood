//import { PopUp } from "../controllers/popups.js";
import { Api } from "./Api.js";
import { Dashboard } from "./Dashboard.js"

const logoKenzieFoodDash = document.querySelector("#LogoKenzieFoodDash")

let data = await Api.PegarProdutos()

const vitrine = document.querySelector(".vitrineDashboard")

Dashboard.disporCartao(data)

const botaoNavDB = document.querySelectorAll(".botaoNavDB")

for (let i = 0; i < botaoNavDB.length; i++) {

    botaoNavDB[i].addEventListener("click",(evt)=>{
        for (let a = 0; a < botaoNavDB.length; a++) {
            if(a !== i){
                botaoNavDB[a].classList.remove("navAtual")
            }    
        }

        let value = evt.target.value
        if(value == "todos"){
            botaoNavDB[i].classList.add("navAtual")
            Dashboard.disporCartao(data) 
        }else{
            botaoNavDB[i].classList.add("navAtual")
            Dashboard.filtroNav(data, value)
        }     
    })    
}

const barraDePesquisaDB = document.querySelector("#barraDePesquisaDB")
barraDePesquisaDB.addEventListener("keydown", event => {
        
    Dashboard.filtroBusca(data,barraDePesquisaDB.value)
})

const popUpEditar = document.querySelector("section#popUpEdicao")    
const popUpApagar = document.querySelector("section#popUpExclusao")    

// popUp editar e apagar
vitrine.addEventListener('click', async(evt) => { 
    data = await Api.PegarProdutos()
    let botao = evt.target
    let arr = botao.classList
    let obj = data.find(element => element.id == botao.id)
    if(botao.id != "" && arr[1] == "botaoEditar"){
        
        Dashboard.editarProdutoModal(obj)
        
        popUpEditar.style.display = "flex"
    }
    if(botao.id != "" && arr[1] == "botaoApagar"){
        Dashboard.excluirProdutoModal(obj.id)
        popUpApagar.style.display = "flex"
    }
    
})

// EDIÇÃO

popUpEditar.addEventListener("click", (evt) => {
    Dashboard.receptorEdicao(evt)
})


popUpApagar.addEventListener("click",async (evt) => {
    let botao = evt.target

    if (botao.name == "excluir") {
        popUpApagar.style.display = "none"
        let resposta = await Api.delete("my/products/", botao.id)
        Dashboard.alertaDeResposta(resposta,"remover")
        Dashboard.vitrine.innerHTML=""
        data = await Api.PegarProdutos()
        Dashboard.disporCartao(data)

    }if(botao.name == "voltar"){
        popUpApagar.style.display = "none"
    }
})

const adicionarProduto = document.querySelector("#botaoAddProduto")
const popUpAdicionar = document.querySelector("#popUp")
const fecharpopUpCadastrar = document.querySelector("#botaoFecharPopUp")
const logOut = document.querySelector("#dashboard1")

//BOTAO PARA ABRIR A POPUP DE CADASTRO

adicionarProduto.addEventListener("click",()=>{
    popUpAdicionar.style.display = "flex"
})


logoKenzieFoodDash.addEventListener("click", () => {
    window.location.href = "../../index.html"
})

//BOTAO DE FECHAO A POP UP DE CADASTRO E LOGICA DO CADASTRO

fecharpopUpCadastrar.addEventListener("click",()=>{
    popUpAdicionar.style.display = "none"
})

console.log(popUpAdicionar)

const cadastrar = document.querySelector("#formCads")
cadastrar.addEventListener("submit", escutadora )
console.log(cadastrar)
async function escutadora (evento){
    evento.preventDefault()


    let resposta = await Dashboard.cadastrarProduto(evento)
        Dashboard.alertaDeResposta(resposta,"adicionar")
        Dashboard.vitrine.innerHTML=""
        data = await Api.PegarProdutos()
        Dashboard.disporCartao(data)
    cadastrar.reset()
}

// BOTAO DE LOGOUT DA ADMIN PAGE

const alertSair = document.querySelector(".alert")
const logOutDash = document.querySelector("#logOutDash")

logOutDash.addEventListener("click", () => {
    let token = localStorage.getItem("token")
    localStorage.setItem("token", "")
    localStorage.setItem("listaDeProdutos", "")
    window.location.href = "./../../index.html"
})

logOut.addEventListener("click", mouseOver);

function mouseOver() {
    alertSair.classList.toggle("toggle")

    
}


const notificacao = document.querySelector(".notificacao")
notificacao.addEventListener("click", (evt)=>{
    let botao = evt.target
    if(botao.id == "fechar"){
        notificacao.classList.remove("movimento")
    }
})


