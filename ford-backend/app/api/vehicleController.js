const db = require('../infra/db');

// GET /vehicles?vehicle=Mustang
exports.list = (req, res) => {
  const { vehicle } = req.query;

  let sql = `
    SELECT vehicle_id AS id,
           vehicle_model AS vehicle,
           vehicle_volumetotal AS volumetotal,
           vehicle_connected AS connected,
           vehicle_softwareUpdates AS softwareUpdates
    FROM VEHICLE
  `;
  const params = [];

  if (vehicle) {
    sql += ' WHERE vehicle_model LIKE ?';
    params.push(`%${vehicle}%`);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
    return res.json({ vehicles: rows });
  });
};
