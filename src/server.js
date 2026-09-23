import express from "express";
const app = express();


//configurações 
    // Configurando o recebimento de JSON
    app.use(express.json());    
    // Importando as variáveis de ambiente
    import "dotenv/config";

//Rotas 
    //Retorna a lista completa de tarefas
    app.get('/tarefas',(req,res)=>{
        res.send('servidor rodando em 3333')
    })
    //Retorna uma única tarefa pelo id
    app.get('/tarefas:id',(req,res)=>{
    })
    //Cria uma nova tarefa a partir do req.body (concluida começa como false)
    app.post('/tarefas',(req,res)=>{
    })
    //Atualiza titulo e/ou concluida de uma tarefa existente
    app.put('/tarefas/:id',(req,res)=>{
    })
    //Remove a tarefa da lista
    app.delete('/tarefas/:id',(req,res)=>{
    })


// Iniciando o servidor
    const PORT = process.env.PORT || 3333;
    app.listen(PORT,()=>{
        console.log("servidor rodando em :http://localhost:3333/")
    })