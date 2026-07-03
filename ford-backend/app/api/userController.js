const db = require('../infra/db');

// POST /login  { email, senha }
exports.login = (req, res) => {
  const { email, senha } = req.body || {};

  if (!email || !senha) {
    return res.status(400).json({ message: 'Informe email e senha.' });
  }

  const sql = `
    SELECT user_id AS id, user_full_name AS nome, user_email AS email
    FROM user
    WHERE user_email = ? AND user_password = ?
  `;

  db.get(sql, [email, senha], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
    if (!row) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    }
    return res.json({ usuario: row });
  });
};
