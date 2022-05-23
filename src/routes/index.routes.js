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
    res.render('../views/results.ejs', { resultado: resultado.orderTrainers, totalSatisfac: resultado.totalSatisfac });
  } catch (e) {
    console.log(e);
  }
});

router.get('/result', async (req, res) => {
  try {
    const resultado = await confCtrl.getDatos([]);
    res.render('../views/results.ejs', { resultado: resultado.orderTrainers, totalSatisfac: resultado.totalSatisfac });
  } catch (e) {
    console.log(e);
  }
});

router.get('/', (req, res) => {
  res.render('../views/home.ejs');
});

module.exports = router;
