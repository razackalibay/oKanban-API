// On pense à executer la méthode config() du module dotenv pour avoir accès aux variables d'environnements
require('dotenv').config();

// On va importer nos models
const { Card, Tag, List } = require('./models');

// Créer une fonction pour faire nos tests
async function runTests() {
  // On viendra tester une lecture avec un console.log() pour verif
  // const lists = await List.findAll({ raw: true }); // L'option raw: true permet de visualer la data comme si on la sortait direct de la DB
  const lists = await List.findAll();
  console.log(lists);
  
  // On viendra tester un insertion avecz un console.log() pour verif
  // const result = List.create({ name: "Troisième liste" });
  // console.log(lists);

  // On viendra tester une MaJ avec un console.log() pour verif
  const list3 = await List.findByPk(3);
  // if (list3) {
  //   list3.set({ name: "ma nouvelle liste" });
  //   await list3.save();
  // }
  // console.log(list3);

  // On viendra tester une suppression avec un console.log() pour verif
  // if (list3) {
  //   list3.destroy();
  // }
}

// Executer cette fonction et voir ce qu'il se passe en console !
runTests();
