import { Api } from "./models/Api.js";

import {Vitrine} from "./models/Vitrine.js"
import { Carrinho } from "./models/Carrinho.js";

let data = []
const token = localStorage.getItem("token")
if(token != ""){
    data = await Api.getAutenticado("my/products")
}else{
    data = await Api.get("products")
}


//Vitrine

Vitrine.disporCartao(data)

const botaoNav = document.querySelectorAll(".botaoNav")


for (let i = 0; i < botaoNav.length; i++) {

    botaoNav[i].addEventListener("click",(evt)=>{

        for (let a = 0; a < botaoNav.length; a++) {
            if(a !== i){
                botaoNav[a].classList.remove("navAtual")
            }    
        }

        let value = evt.target.value
        if(value == "todos"){
            botaoNav[i].classList.add("navAtual")
            Vitrine.disporCartao(data) 
        }else{
            botaoNav[i].classList.add("navAtual")
            Vitrine.filtroNav(data, value)
        }
    })    
}

const barraDePesquisa = document.querySelector("#barraDePesquisa")
barraDePesquisa.addEventListener("keydown", event => {
    
    Vitrine.filtroBusca(data,barraDePesquisa.value)
})


//Carrinho


const abrirModal = document.querySelector("#carrinho")
const modal = document.querySelector(".modalBase")
const fecharModal = document.querySelector(".fecharModal")

modal.hidden = true
abrirModal.addEventListener("click",()=>{ modal.hidden = false})
fecharModal.addEventListener("click",()=>{ modal.hidden = true})

const vitrine = document.querySelector(".vitrine")

vitrine.addEventListener("click", async (evt)=>{

    const id = evt.target.id
    if (id != ""){
            Carrinho.encontrarId(data, id)
            Carrinho.disporCartao()
      
    }       
})

const carrinho = document.querySelector(".carrinhoModal")
const carrinhoDesktop = document.querySelector(".carrinho")

function interceptarRemoção(evt){
    const id = evt.target.id
    if (id != ""){
        Carrinho.removerProduto(id)
        Carrinho.disporCartao() 
    } 
}

carrinho.addEventListener("click",interceptarRemoção)
carrinhoDesktop.addEventListener("click",interceptarRemoção)

//Log

const login = document.querySelector("#login")
const logout = document.querySelector("#logout")
const dashboard = document.querySelector("#dashboard")
const admin = document.querySelector("#dashboard")



logout.hidden = true
admin.hidden = true

if(token != ""){
    login.hidden = true
    logout.hidden = false
    admin.hidden = false

}else{
    login.hidden = false
    logout.hidden = true
    admin.hidden = true
}

login.addEventListener("click",()=>{
    window.location.href = "./src/pages/login.html"
})

logout.addEventListener("click",()=>{
    localStorage.setItem("token", "")
    localStorage.setItem("listaDeProdutos", "")
    document.location.reload(true)
})

dashboard.addEventListener("click", () => {
    window.location.href = "./src/pages/dashboard.html"
})

Carrinho.disporCartao()