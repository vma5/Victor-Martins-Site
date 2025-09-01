const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '')));

// Rota para o formulário de contato
app.post('/enviar-email', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    // Crie o transportador Nodemailer (configure com suas informações de e-mail)
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Exemplo: 'gmail', 'hotmail' etc.
        auth: {
            user: 'seu.email@gmail.com', // Seu e-mail
            pass: 'sua_senha_de_app_gmail' // Senha de app gerada pelo Google
        }
    });

    // Configure o conteúdo do e-mail
    const mailOptions = {
        from: email,
        to: 'victormartisn321.va1@gmail.com', // Seu e-mail de destino
        subject: `Novo Contato do Portfólio: ${assunto}`,
        text: `Nome: ${nome}\nE-mail: ${email}\nMensagem: ${mensagem}`
    };

    // Envie o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao enviar a mensagem.');
        } else {
            console.log('E-mail enviado: ' + info.response);
            res.status(200).send('Mensagem enviada com sucesso!');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});