import express from "express";
const app = express();
import pool from "./database/db.js"

import cors from "cors";


//configurações 
    // Configurando o recebimento de JSON
    app.use(express.json());    
    // Importando as variáveis de ambiente
    import "dotenv/config";
    //configurando o cors 
    app.use(cors());
    //configurando os arquivos json
    app.use(express.json());

    //funçao para formatar as tarefas passando o valor binario do bamco para true e false 
    function formatar(tarefa) {
        return {
            ...tarefa,
            concluida: Boolean(tarefa.concluida)
        };
    }


// Rotas
    // Retorna a lista completa de tarefas
    app.get('/tarefas', async (req, res) => {
        try {
            const [tarefas] = await pool.execute(`select * from tarefas`);

            // Pega o array devolvido pelo banco e percorre com o map,usando a função formatar em cada elemento.
            return res.status(200).json(tarefas.map(formatar));

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro interno do servidor"
            });
        }
    });


    // Retorna uma única tarefa pelo id
    app.get('/tarefas/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);

            const [tarefas] = await pool.execute(`select * from tarefas where id = ?`, [id]);

            if (tarefas.length === 0) {
                return res.status(404).json({
                    mensagem: "Tarefa não encontrada"
                });
            }
            // Pega o array devolvido pelo banco e percorre com o map,usando a função formatar em cada elemento.
            return res.status(200).json(formatar(tarefas[0]));

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro interno do servidor"
            });
        }
    });

    //Cria uma nova tarefa a partir do req.body (concluida começa como false)
    app.post('/tarefas', async (req, res) => {
        try {
            const {titulo} = req.body
            
        if (!titulo || titulo.trim() === '') {
             return res.status(400).json({
                 error: "Titulo obrigatório"
            });
        }

        const [resultado] = await pool.execute(`insert into tarefas (titulo) values (?)`, [titulo]);

        return res.status(201).json({
            id: resultado.insertId,
            titulo:titulo,
            concluida: false
        });

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro interno do servidor"
            })
        }
    })

    // Atualiza titulo e/ou concluida de uma tarefa existente
    app.put('/tarefas/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);
            const body = req.body || {};

            //verifica se a tarefa existe no banco de dados 
            const [tarefas] = await pool.execute(`select * from tarefas where id = ?`,[id]);

            if (tarefas.length === 0) {
                return res.status(404).json({
                    mensagem: "Tarefa não encontrada"
                });
            }

            if (body.titulo !== undefined && body.titulo.trim() === '') {
                return res.status(400).json({
                    mensagem: "O titulo é obrigatório"
                });
            }

            if (body.concluida !== undefined && typeof body.concluida !== 'boolean') {
                return res.status(400).json({
                    erro: "concluida deve ser true ou false"
                });
            }

           /*
            O operador ternário verifica se o valor de body.titulo não é indefinido. Se for true (não for indefinido), 
            ele atribui o valor de body.titulo para a constante titulo senão atribui o valor encontrado no banco de dados.
           */
            const titulo = body.titulo !== undefined ? body.titulo : tarefas[0].titulo;
            const concluida = body.concluida !== undefined ? body.concluida : tarefas[0].concluida;

            await pool.execute(`update tarefas set titulo = ?, concluida = ? where id = ?`,[titulo, concluida, id]);

            return res.status(200).json({
                mensagem: "Tarefa atualizada com sucesso"
            });

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro interno do servidor"
            });
        }
    });

    //deletar tarefa 
    app.delete('/tarefas/:id', async (req, res) => {
        try {
            const id = Number(req.params.id);

            const [resultado] = await pool.execute(`delete FROM tarefas where id = ?`, [id]);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    erro: "Tarefa não encontrada"
                });
            }

            return res.status(204).send();

        } catch (error) {
                return res.status(500).json({
                erro: "Erro ao acessar o banco de dados"
            });
        }
    });

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});