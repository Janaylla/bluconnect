interface PasswordChangedEmailI {
  name: string;
}
export const passwordChangedEmail = ({ name }: PasswordChangedEmailI) => {
  return `<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Senha Alterada com Sucesso</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f9fc;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            padding: 20px;
        }
        h1 {
            color: #1976d2; /* Cor atualizada */
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
        footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Senha Alterada com Sucesso</h1>
        <p>Olá, ${name}</p>
        <p>Seu pedido para alterar a senha foi realizado com sucesso.</p>
        <p>Se você não solicitou essa alteração, entre em contato com o suporte imediatamente.</p>
          <footer>
              <p>Atenciosamente,</p>
              <p>BluConnect</p>
          </footer>
      </div>
  </body>
  </html>
  `;
};
