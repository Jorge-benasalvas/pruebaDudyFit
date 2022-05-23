const express = require('express');
const trainers = require('../../data/trainers.json');

const router = express.Router();
const confCtrl = require('../controller/confCtrl');
const clients = require('../../data/clients.json');

router.get('/conf', async (req, res) => {
  res.render('../views/conf.ejs', { trainers, clients });
});

router.post('/result', async (req, res) => {
  try {
    const resultado = await confCtrl.getDatos(req.body);
    console.log(resultado);
    res.render('../views/results.ejs', { resultado: resultado.orderTrainers, totalSatisfac: resultado.totalSatisfac });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
