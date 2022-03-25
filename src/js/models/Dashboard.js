import { Api } from "./Api.js";

export class Dashboard{
    static vitrine = document.querySelector(".vitrineDashboard")

    static criarCartao(obj){
        const li = document.createElement('li');
        li.classList.add('flex')
        li.classList.add('cartaoProduto')
        li.innerHTML=`
            <div class="flex">
                <img class="imgProduto" src=${obj.imagem} alt=${obj.nome}>
                <h2>${obj.nome}</h2>             
            </div >
            <p id="produtoCategoria">${obj.categoria}</p>
            <p id="produtoDescricao">${obj.descricao}</p>
            <div class="botaoCartao flex">

                <button  id=${obj.id} class="botaoProduto botaoEditar "><i id=${obj.id} class="fa-solid botaoEditar fa-pen-to-square "></i></button>
                <button id=${obj.id} class="botaoProduto botaoApagar "><i  id=${obj.id} class="fa-solid botaoApagar fa-trash "></i></button>
            </div>
        `
        return li
    }

    static disporCartao(data){
        const vitrine = document.querySelector(".vitrineDashboard")

        vitrine.innerHTML=""
        data.forEach((element) => {  
            vitrine.appendChild(Dashboard.criarCartao(element))  
        })
    }

    static  filtroNav(data, value){
        this.vitrine.innerHTML=""  
        data.forEach((element) => {  
            if(element.categoria == value){
                this.vitrine.appendChild(Dashboard.criarCartao(element))
            }
            
        })
    }

    static filtroBusca(data, value){
        this.vitrine.innerHTML=""
        data.forEach((element) => {
            let nome = element.nome.toLowerCase()  
            let pesquisa = value.toLowerCase()

            if(nome.includes(pesquisa)){
                this.vitrine.appendChild(Dashboard.criarCartao(element))
            } 
        })
    }

    static editarProdutoModal(obj){
        const form = document.querySelector("#popUpEditar") 
        form.innerHTML=`
        <input type="hidden" name="id" value="${obj.id}"/>
        <label for="nome">Nome do produto</label>
        <input type="text" name="nome" placeholder="Nome do produto" class="popInputEdicao" value="${obj.nome}" />
        <label for="descricao">Descrição</label>
        <input type="textarea" name="descricao" placeholder="Descrição" class="popInputEdicao" value="${obj.descricao}"/>

        <label for="categorias">Categorias</label>
        <div>
        <select name="categoria">
        <option value="Panificadora">Panificadora</option>
        <option value="Frutas">Frutas</option>
        <option value="Bebidas">Bebidas</option>
      </select>
        </div>

        <label for="preco">Preço do produto</label>
        <input type="number" name="preco" placeholder="Preço do produto" class="popInput" value="${obj.preco.toFixed(2)}"/>   
        
        <label for="imagem">Link da imagem</label>
        <input type="url" name="imagem" placeholder="Link da imagem" class="popInput" value="${obj.imagem}" />

        <div class="flex bPopUpEdit">
            <button type="button"id="${obj.id}" class="redirecionar botaoPadraoBranco">Excluir</button>
            <button type="submit" class="botaoPadrao botaoSalvarEdicao">Salvar alterações</button>
        </div>
        `
    }
    static excluirProdutoModal (id){
        const popUpExcluir = document.querySelector(".popUpformExcluir")

        popUpExcluir.innerHTML =`                    
        <p id="exclusaoAviso">Tem certeza que deseja excluir esse produto?</p>           
        <div id="buttonBoxConfirma" class="flex">
            <button name="excluir"id="${id}"class="botaoPadraoBranco botaoConfirma excluirProduto">Sim</button>
            <button name="voltar" id="sair" class="botaoPadraoBranco botaoSair">Não</button>
        </div>
        `
    }
    static async receptorEdicao (evt, data){
        const popUpEditar = document.querySelector("section#popUpEdicao")    
        const popUpApagar = document.querySelector("section#popUpExclusao") 

        evt.preventDefault()

        let botao = evt.target
        
        let obj = evt.target.id
    
        if(botao.classList[0] == "redirecionar"){
            Dashboard.excluirProdutoModal(obj.id)
            popUpEditar.style.display = "none"
            popUpApagar.style.display = "flex"
        }else if(botao.id == "botaoFecharPopUpEdicao"){
            popUpEditar.style.display = "none"
        }else if(botao.type === "submit"){
            let form = botao.closest("form")
            let obj = {
                nome : form["nome"].value,
                preco: form["preco"].value,
                categoria: form["categoria"].value,
                descricao: form["descricao"].value,
                imagem: form["imagem"].value
            }


            let resposta = await Api.patch("my/products", form["id"].value, obj)
           
            Dashboard.vitrine.innerHTML=""
            data = await Api.PegarProdutos()
            Dashboard.disporCartao(data)


            popUpEditar.style.display = "none"        
            console.log()
            Dashboard.alertaDeResposta(Api.response, "editar")
            //document.location.reload(true)
        }
    }

    static async cadastrarProduto(submissao){

        const popUpAdicionar = document.querySelector("#popUp")

        const entrada = submissao.target;
        
        const objeto = {};
    
        for (let i = 0; i < entrada.length; i++) {
            const { name, value } = entrada[i];
            if (name) {
                objeto[name] = value;
            }
        }
        popUpAdicionar.style.display = "none" 
        return await Api.postarProdutos(objeto)
    }
    static alertaDeResposta (resposta,requisicao){
        const notificacao = document.querySelector(".notificacao")
        const notificacaoCorpo = document.querySelector(".notificacaoCorpo")
        if(resposta == true){
            notificacao.classList.add("movimento")
            notificacaoCorpo.classList.add("notificacaoOk")
            notificacaoCorpo.classList.remove("notificacaoErro")
            if(requisicao =="remover"){
                notificacaoCorpo.innerText = "Produto removido com sucesso"
            }else if(requisicao =="adicionar"){
                notificacaoCorpo.innerText = "Produto adicionado com sucesso"  
            }else if(requisicao =="editar"){
                notificacaoCorpo.innerText = "Produto editado com sucesso"
            }
            
        }
        if(resposta == false){
            notificacao.classList.add("movimento")
            notificacaoCorpo.classList.add("notificacaoErro")
            notificacaoCorpo.classList.remove("notificacaoOk")
            if(requisicao =="remover"){
                notificacaoCorpo.innerText = "Ocorreu algum erro, o produto não foi removido"
            }else if(requisicao =="adicionar"){
                notificacaoCorpo.innerText = "Ocorreu algum erro, o produto não foi adicionado"
            }else if(requisicao =="editar"){
                notificacaoCorpo.innerText = "Ocorreu algum erro, o produto não foi editado"
            }
            
        }
        
        setTimeout(()=>{
            notificacao.classList.remove("movimento")
        },5000)
    }
}