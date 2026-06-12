const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORTA = 3000;

// Configuração do motor de visualização e recebimento de dados
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database('sistemadechamados.db', (err) => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados:', err.message);
        return;
    }

    console.log('Conectado ao banco de dados SQLite.');
    const queryCriacao = `
        CREATE TABLE IF NOT EXISTS chamados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            canal TEXT NOT NULL,
            titulo TEXT NOT NULL,
            descricao TEXT,
            prioridade TEXT NOT NULL,
            destino TEXT NOT NULL,
            status TEXT NOT NULL,  
            pendencia INTEGER DEFAULT 0
        )
    `;
     db.run(queryCriacao, (err) => {
        if(err) console.error("Erro ao criar tabela:", err.message);
    });
});

app.get('/cadastrar', (req, res) => {
    res.render('cadastrar')
});


app.post('/cadastrar', (req, res) => {
    const { nome, titulo, email, canal, descricao, prioridade, destino, status, pendencia} = req.body;
    const query = `INSERT INTO chamados(nome, titulo, email, canal, descricao, prioridade, destino, status, pendencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`; 
    db.run(query,[nome, titulo, email, canal, descricao, prioridade, destino, status, pendencia],(err,result) => {
        if(err){
            console.error(err);
            return res.status(500).send("Erro na catalogação de jogo");
        }
        res.redirect('/');
    });
});

app.get('/',(req,res) => {
   const query = `SELECT * from chamados`; 
    
    db.all(query,[], (err,rows) =>{
        if(err){
            console.error(err);
            return res.status(500).send("Não tem nenhum chamado catalogado");
        }
        res.render("index",{chamados: rows});
    }); 
});

// O servidor ficará ouvindo a porta 3000
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
