const confCtrl = require('../controller/confCtrl');

describe('Test de la app dudyfitTest', () => {
  test('getSatisfac devuelve 5', async () => {
    const satisfact = await confCtrl.getSatisfac(4.8, 8.2);
    expect(satisfact).toEqual(5);
  });

  test('getSatisfac no devuelve 5', async () => {
    const satisfact = await confCtrl.getSatisfac(3.2, 8.2);
    expect(satisfact).not.toEqual(5);
  });

  test('obteniendo entrenadores', async () => {
    const equalTrainers = {
      trainers: [
        { id: 1, name: 'C', reputation: 1.2, available: 3 },
        { id: 2, name: 'B', reputation: 3.2, available: 4 },
        { id: 3, name: 'D', reputation: 3.4, available: 2 },
        { id: 4, name: 'A', reputation: 4.5, available: 1 },
      ],
    };
    const dataTrainers = {
      'name-4': 'A',
      'val-4': '4.5',
      'maxCli-4': '1',
      'name-2': 'B',
      'val-2': '3.2',
      'maxCli-2': '4',
      'name-1': 'C',
      'val-1': '1.2',
      'maxCli-1': '3',
      'name-3': 'D',
      'val-3': '3.4',
      'maxCli-3': '2',
    };
    const trainers = confCtrl.getTrainers(dataTrainers);
    expect(trainers).toEqual(equalTrainers);
  });

  test('obteniendo entrenadores no coincide', async () => {
    const equalTrainers = {
      trainers: [
        { id: 1, name: 'C', reputation: 1.2, available: 3 },
        { id: 2, name: 'B', reputation: 3.2, available: 4 },
        { id: 3, name: 'D', reputation: 3.4, available: 2 },
        { id: 4, name: 'A', reputation: 5.5, available: 1 },
      ],
    };
    const dataTrainers = {
      'name-4': 'A',
      'val-4': '4.5',
      'maxCli-4': '1',
      'name-2': 'B',
      'val-2': '3.2',
      'maxCli-2': '4',
      'name-1': 'C',
      'val-1': '1.2',
      'maxCli-1': '3',
      'name-3': 'D',
      'val-3': '3.4',
      'maxCli-3': '2',
    };
    const trainers = confCtrl.getTrainers(dataTrainers);
    expect(trainers).not.toEqual(equalTrainers);
  });

  test('obteniendo datos', async () => {
    const data = { 
        'name-4': 'A',
    'val-4': '4.5',
    'maxCli-4': '1',
    'name-2': 'B',
    'val-2': '3.2',
    'maxCli-2': '4',
    'name-1': 'C',
    'val-1': '1.2',
    'maxCli-1': '3',
    'name-3': 'D',
    'val-3': '3.4',
    'maxCli-3': '2',}
  

    const resultadoTest = {
        orderTrainers: [
            {
                id: 4,
                name: 'A',
                reputation: 4.5,
                available: 1,
                clients: [ { name: 't', id: 4, satisfac: 4 } ]
              },
              {
                id: 3,
                name: 'D',
                reputation: 3.4,
                available: 2,
                clients: [
                  { name: 's', id: 3, satisfac: 1 },
                  { name: 'y', id: 9, satisfac: 2 }
                ]
              },
              {
                id: 2,
                name: 'B',
                reputation: 3.2,
                available: 4,
                clients: [
                  { name: 'w', id: 7, satisfac: 5 },
                  { name: 'v', id: 6, satisfac: 5 },
                  { name: 'r', id: 2, satisfac: 5 },
                  { name: 'x', id: 8, satisfac: 5 }
                ]
              },
              {
                id: 1,
                name: 'C',
                reputation: 1.2,
                available: 3,
                clients: [
                  { name: 'q', id: 1, satisfac: 5 },
                  { name: 'u', id: 5, satisfac: 5 },
                  { name: 'z', id: 10, satisfac: 5 }
                ]
              }
        ],
        totalSatisfac:4.2
    }

    const dataTrainers = await confCtrl.getDatos(data)

    expect(resultadoTest).toEqual(dataTrainers)
});
});
