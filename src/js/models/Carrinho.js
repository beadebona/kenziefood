//carrinho
export class Carrinho {
    static listaProdutos = []
    static idAdicionados = []

    static encontrarId(array, value){
        //const data = array
        array.forEach((element) => {
            let id = element.id  
            //let produto;
            if(id == value){
                Carrinho.listaProdutos.push(element)
                Carrinho.atualizarInfoCarrinho()
            }
        })
    }
    static disporCartao(){
        
        const token = localStorage.getItem("token")
        if(token == ""){
            this.listaProdutos = JSON.parse(localStorage.getItem("listaDeProdutos"))

        }
        this.atualizarInfoCarrinho()
        const carrinho = document.querySelector(".carrinhoModal")
        const carrinhoDesktop = document.querySelector(".carrinho")
        carrinho.innerHTML=""
        carrinhoDesktop.innerHTML=""
        Carrinho.idAdicionados = []
        Carrinho.listaProdutos.forEach((element) => {  
            if(!Carrinho.idAdicionados.includes(element.id)){
                
                carrinho.appendChild(Carrinho.cartaoCarrinho(element))
                carrinhoDesktop.appendChild(Carrinho.cartaoCarrinho(element))
            }
            
            Carrinho.idAdicionados.push(element.id)
        })
        const divVitrine = document.querySelector("#carrinhoAtivo")
        const divBanner  = document.querySelector("#bannerVazio")
        if(this.listaProdutos.length !== 0){

            divVitrine.classList.remove("hidden")
            divBanner.classList.add("hidden")
        }else{
            divBanner.classList.remove("hidden")
            divVitrine.classList.add("hidden")
        }
    }

    static cartaoCarrinho(obj){
        const li =document.createElement('li')
        let quantidadeItem = 0
        Carrinho.listaProdutos.forEach((element) => {
            
            if(element.id === obj.id){
                quantidadeItem++
            }
        })
        li.classList.add("cartaoCarrinho","flex")
        li.innerHTML =`
        <img class="imagemCarrinho" src="${obj.imagem}" alt="">
        <div class="informacao">
            <h2 class="nome">${obj.nome}</h2>
            <p class="categoria">${obj.categoria}</p>
            <p class="categoria">Qtd: ${quantidadeItem} </p>
        <span>R$${obj.preco.toFixed(2).replace(".",",")}</span>
        </div>
        <button class="removerCarrinho" id="${obj.id}"><i id="${obj.id}" class=" fa-solid fa-trash"></i></button>
        `
        return li
    }

    static removerProduto(id){
        const index = this.listaProdutos.findIndex(item => {
            if(item.id === id){
                return true
            }
            return false
        })

        this.listaProdutos.splice(index, 1)
        this.atualizarInfoCarrinho()
    }

    static atualizarInfoCarrinho(){

        let precoTotal = 0
        let quantidadeTotal = 0
        Carrinho.listaProdutos.forEach((produto) => {
            precoTotal += produto.preco
            quantidadeTotal ++

        })
        const tagPreco      = document.querySelector("#precoTotal")
        const tagQuantidade = document.querySelector("#quantidadeTotal")

        const tagPrecoMobile      = document.querySelector("#precoTotalMobile")
        const tagQuantidadeMobile = document.querySelector("#quantidadeTotalMobile")

        tagPrecoMobile.innerText      = "R$" + precoTotal.toFixed(2).replace(".",",")
        tagQuantidadeMobile.innerText = quantidadeTotal

        tagPreco.innerText      = "R$" + precoTotal.toFixed(2).replace(".",",")
        tagQuantidade.innerText = quantidadeTotal
        localStorage.setItem("listaDeProdutos", JSON.stringify(this.listaProdutos))
        this.listaProdutos = JSON.parse(localStorage.getItem("listaDeProdutos"))
        
    }

}