import express from "express";
const app = express();


//arrey com objetos usado como banco de dados 
const databases = [{
    "id": 1,
    "titulo": "Estudar Express",
    "concluida":false
},
{
    "id":2,
    "titulo":"Revisar rotas de CRUD",
    "concluida":true
}
];

//configurações 
    // Configurando o recebimento de JSON
    app.use(express.json());    
    // Importando as variáveis de ambiente
    import "dotenv/config";

//Rotas 
    //Retorna a lista completa de tarefas
    app.get('/tarefas',(req,res)=>{
        try{
            return res.status(200).json(databases)
        }catch(error){
            return res.status(500).json({
                message:"Erro interno do servidor "
            })
        }
    })
    //Retorna uma única tarefa pelo id
    app.get('/tarefas/:id',(req,res)=>{
        try{
            const id = Number(req.params.id);

            const tarefa = databases.find(tarefa => tarefa.id  === id);

            if(!tarefa){
                return res.status(404).json({
                    message:"Tarefa não encontrada"
                })
            }
            return res.status(200).json(tarefa)

        }catch(error){
            return res.status(500).json({
                 message:"Erro interno do servidor"
            })
        }
    })
    //Cria uma nova tarefa a partir do req.body (concluida começa como false)
    app.post('/tarefas', (req, res) => {
        try {
        if (!req.body.titulo || req.body.titulo.trim() === '') {
             return res.status(400).json({
                 error: "Titulo obrigatório"
            });
        }

        const novaTarefa = {
            id: databases.length + 1,
            titulo: req.body.titulo,
            concluida: false
        };
        databases.push(novaTarefa)

        
        return res.status(201).json(novaTarefa)

        } catch (error) {
        return res.status(500).json({
            message: "Erro interno do servidor"
        })
        }
    })
    //Atualiza titulo e/ou concluida de uma tarefa existente
    app.put('/tarefas/:id', (req, res) => {
    try {
        const id = Number(req.params.id);

        const tarefa = databases.find(tarefa => tarefa.id === id);

        if (!tarefa) {
            return res.status(404).json({
                message: "Tarefa não encontrada"
            });
        }

        const body = req.body || {};

        if (body.titulo !== undefined) {
            if (body.titulo.trim() === '') {
                return res.status(400).json({
                    erro: "Titulo obrigatório"
                });
            }

            tarefa.titulo = body.titulo;
        }

        if (body.concluida !== undefined) {
            if (typeof body.concluida !== 'boolean') {
            return res.status(400).json({
                erro: "concluida deve ser true ou false"
            });
        }

    tarefa.concluida = body.concluida;
}

        return res.status(200).json(tarefa);

    } catch (error) {
        return res.status(500).json({
            message: "Erro interno do servidor"
        });
    }
    });
    //Remove a tarefa da lista
     app.delete('/tarefas/:id',(req,res)=>{
        
     try {
        const id = Number(req.params.id); // pega o id da URL e transforma em número

        const indice = databases.findIndex(tarefa => tarefa.id === id);

       if (indice === -1) { // significa que a tarefa não existe
         return res.status(404).json({
            message: "Tarefa não encontrada"
         });
      }

      databases.splice(indice, 1); // remove 1 elemento naquela posição

     return res.status(204).send(); // remoção silenciosa realizada  

    } catch (error) {
        return res.status(500).json({
        message: "Erro interno do servidor"
        });
    }})


// Iniciando o servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT,()=>{
        console.log("servidor rodando em :http://localhost:3000")
    })