export class Api {

    static urlBase = "https://kenzie-food-api.herokuapp.com/"
    static response;
    static async get(path) {
        
        const resposta = await fetch(this.urlBase + path)
        const data = await resposta.json()
        
        return data
    }

    static async post(path, data) {
        
        const resposta = await fetch(this.urlBase + path,  {
            method: "post",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(data)

        })

        return resposta.ok
    }

    static async delete(path, id){
        const token = localStorage.getItem("token")
        const resposta = await fetch(this.urlBase + path + id, {
            method: "delete",   
            headers: {
                "Authorization": `Bearer ${token}` 
            }         
        })

        return resposta.ok
    }

    static async patch(path, id, data) {
        const token = localStorage.getItem("token")
        const resposta = await fetch(`${this.urlBase}${path}/${id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`           
            },
            body: JSON.stringify(data) 
        })
        
  
        return resposta
    }

    static async registrarUsuario(data){

        const resposta = await fetch("https://kenzie-food-api.herokuapp.com/auth/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const informacaoLogin = await resposta.json()

        const sucesso = resposta.ok
        return sucesso
    }

    static async login(data){

        const resposta = await fetch("https://kenzie-food-api.herokuapp.com/auth/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const token = await resposta.json()
        
        localStorage.setItem("token", token)
        
        return resposta.ok
    }

    static async PegarProdutos(){
        const token = localStorage.getItem("token")
         const resposta = await fetch("https://kenzie-food-api.herokuapp.com/my/products", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const lista = await resposta.json()
        Api.response =resposta.ok
        return lista
    }

    static async postarProdutos(data){
        const token = localStorage.getItem("token")
        const resposta = await fetch("https://kenzie-food-api.herokuapp.com/my/products", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        return resposta.ok
    }
    static async getAutenticado(path) {
        const token = localStorage.getItem("token")
        const resposta = await fetch(this.urlBase + path,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await resposta.json()
        
        return data

    }
}