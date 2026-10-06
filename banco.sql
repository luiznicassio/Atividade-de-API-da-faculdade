CREATE DATABASE IF NOT EXISTS api_atividade_07;

USE api_atividade_07;

CREATE TABLE `tarefas` (
   `id` int NOT NULL AUTO_INCREMENT,
   `titulo` varchar(120) NOT NULL,
   `concluida` tinyint(1) NOT NULL DEFAULT '0',
   PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
INSERT INTO tarefas (titulo, concluida) VALUES
 ('Estudar Express', FALSE),
 ('Revisar rotas de CRUD', TRUE),
 ('Testar a API no Postman', FALSE);