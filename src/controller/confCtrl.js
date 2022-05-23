/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-catch */
const trainersData = require('../../data/trainers.json');
const clientsJSON = require('../../data/clients.json');

const confCtrl = {
  getSatisfac(reputation, trainerRep) {
    // console.log(reputation, trainerRep);
    const satisfac = Number((trainerRep / 2 - reputation).toFixed(2));

    switch (true) {
      case satisfac <= 0.2:
        return 5;

      case satisfac > 0.2 && satisfac <= 0.4:
        return 4;

      case satisfac > 0.4 && satisfac <= 0.6:
        return 3;

      case satisfac > 0.6 && satisfac <= 0.8:
        return 2;

      case satisfac > 0.8 && satisfac < 1:
        return 1;

      case satisfac === 1:
        return 0;

      default:
        return 0;
    }
  },

  getTrainers(data) {
    const numTrainers = { trainers: [] };
    for (let cont = 1; Object.keys(data).length / 3 >= cont; cont += 1) {
      const obj = {
        id: cont,
        name: data[`name-${cont}`],
        reputation: Number(data[`val-${cont}`]),
        available: Number(data[`maxCli-${cont}`]),
      };
      numTrainers.trainers.push(obj);
    }

    return numTrainers;
  },

  async getDatos(data) {
    try {
      let newTrainers = JSON.parse(JSON.stringify(trainersData));
      if (Object.keys(data).length > 0) {
        newTrainers = await this.getTrainers(data);
      }
      const clients = JSON.parse(JSON.stringify(clientsJSON));

      const orderTrainers = newTrainers.trainers.sort((a, b) => b.reputation - a.reputation);
      const orderClients = clients.clients.sort((a, b) => b.trainerRep - a.trainerRep);
      const totalClients = orderClients.length;
      let totalSatisfac = 0;

      for (const trainer of orderTrainers) {
        trainer.clients = [];
        let clientAvailable = trainer.available;
        for (const cliente of orderClients) {
          if (clientAvailable > 0) {
            clientAvailable -= 1;

            const satisfac = await this.getSatisfac(trainer.reputation, cliente.trainerRep);
            totalSatisfac += satisfac;
            const clientData = {
              name: cliente.name,
              id: cliente.id,
              satisfac,
            };
            trainer.clients.push(clientData);
          }
        }
        orderClients.splice(0, trainer.available);
      }
      totalSatisfac /= totalClients;

      return { orderTrainers, totalSatisfac };
    } catch (e) {
      throw e;
    }
  },
};

module.exports = confCtrl;
