const express = require('express');
const router = express.Router();

const userController = require('../api/userController');
const vehicleController = require('../api/vehicleController');
const vehicleDataController = require('../api/vehicleDataController');

router.get('/', (req, res) => {
  res.json({ status: 'API FORD rodando com sucesso.' });
});

router.post('/login', userController.login);
router.get('/vehicles', vehicleController.list);
router.get('/vehicledata', vehicleDataController.list);

module.exports = router;
