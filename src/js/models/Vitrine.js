export class Vitrine {
    static criarCartao(obj){
        const li = document.createElement('li');
        li.classList.add('cartaoProduto')
        li.innerHTML=`
        <img  class="imgProduto" src="${obj.imagem}" alt="">                    
        <h2>${obj.nome}</h2>
            <p class="descricao">${obj.descricao}</p>
            <p class="categoria">${obj.categoria}</p>
        
        <div class="preco spaceBetween">
            <span>R$ ${obj.preco.toFixed(2).replace(".",",")}</span>
            <button id="${obj.id}" class="adicionarCarrinho"><i id="${obj.id}" class="fa-solid fa-cart-plus"></i></button>
        </div>`

        return li

    }
    static disporCartao(data){
        const vitrine = document.querySelector(".vitrine")
        vitrine.innerHTML=""
        data.forEach((element) => {  
            vitrine.appendChild(Vitrine.criarCartao(element))
        })
    }
    static filtroNav(data, value){
        const vitrine = document.querySelector(".vitrine")
        vitrine.innerHTML=""
        data.forEach((element) => {  
            if(element.categoria == value){
                vitrine.appendChild(Vitrine.criarCartao(element))
            }
            
        })
    }
    static filtroBusca(data, value){
        const vitrine = document.querySelector(".vitrine")
        vitrine.innerHTML=""
        data.forEach((element) => {
            let nome = element.nome.toLowerCase()  
            let pesquisa = value.toLowerCase()

            if(nome.includes(pesquisa)){
                vitrine.appendChild(Vitrine.criarCartao(element))
            } 
        })
    }
}

