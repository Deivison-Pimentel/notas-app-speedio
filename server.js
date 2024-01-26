const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'sua_chave_secreta';

// Middleware para verificar o token
function verificarToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, SECRET_KEY, (err) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Decodificado com sucesso, prossegue para a próxima rota
    next();
  });
}

// Rotas públicas
app.post('/api/login', (req, res) => {
  // Lógica de autenticação (substitua pelo seu próprio método)
  const user = {
    id: 1,
    username: 'usuario',
  };

  // Gera um token
  const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

// Rota protegida
app.get('/api/protegida', verificarToken, (req, res) => {
  res.json({ message: 'Esta é uma rota protegida' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
