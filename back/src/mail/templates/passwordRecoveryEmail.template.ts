interface PasswordRecoveryEmailI {
  code: string;
  name: string;
}
export const passwordRecoveryEmail = ({
  code,
  name,
}: PasswordRecoveryEmailI) => {
  return `<html lang="pt-BR"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperação de Senha</title>
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
        .code {
            font-size: 24px;
            font-weight: bold;
            color: #1976d2; /* Cor atualizada */
            margin: 20px 0;
            text-align: center;
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
        <h1>Recuperação de Senha</h1>
        <p>Olá, ${name}</p>
        <p>Recebemos um pedido para redefinir sua senha. Use o código abaixo para criar uma nova senha:</p>
        <div class="code">${code}</div>
        <p>Este código é válido por 5 minutos. Se você não solicitou a redefinição da senha, pode ignorar este e-mail.</p>
        <footer>
            <p>Atenciosamente,</p>
            <p>BluConnect</p>
        </footer>
    </div>
</body>
</html>
`;
};
