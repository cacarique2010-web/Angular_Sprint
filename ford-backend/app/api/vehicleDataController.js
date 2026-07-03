const db = require('../infra/db');

// GET /vehicledata?vin=2FRHDUYS2Y63NHD22454
exports.list = (req, res) => {
  const { vin } = req.query;

  let sql = `
    SELECT vehicledata_id AS id,
           vehicledata_vin AS vin,
           vehicledata_odometer AS odometer,
           vehicledata_tirePressure AS tirePressure,
           vehicledata_status AS status,
           vehicledata_batteryStatus AS batteryStatus,
           vehicledata_fuelLevel AS fuelLevel,
           vehicledata_lat AS lat,
           vehicledata_long AS long
    FROM VEHICLEDATA
  `;
  const params = [];

  if (vin) {
    sql += ' WHERE vehicledata_vin LIKE ?';
    params.push(`%${vin}%`);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
    return res.json({ vehicledata: rows });
  });
};
