const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

// Configurar o middleware para servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '')));

// Configurar o middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota POST para processar o formulário de contato
app.post('/enviar-email', (req, res) => {
    // Extrair os dados do corpo da requisição
    const { nome, email, assunto, mensagem } = req.body;

    // Configuração do transportador de e-mail (usando Gmail como exemplo)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'victormartisn321.va1@gmail.com', // Seu endereço de e-mail
            pass: 'rbvi gwtx vofu ffvq' // Use a senha de app gerada pelo Google
        }
    });

    // Conteúdo do e-mail
    const mailOptions = {
        from: `"${nome}" <${email}>`,
        to: 'victormartins321.va1@gmail.com', // Endereço para onde a mensagem será enviada
        subject: `Novo Contato do Portfólio: ${assunto}`,
        html: `
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Mensagem:</strong> ${mensagem}</p>
        `
    };

    // Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar o e-mail:', error);
            return res.status(500).send('Erro ao enviar a mensagem.');
        }
        console.log('Mensagem enviada:', info.response);
        res.status(200).send('Mensagem enviada com sucesso!');
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});