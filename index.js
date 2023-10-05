require('dotenv').config();
const express = require('express');
const router = require('./app/routers'); // je recup mon fichier app/routers/index.js

const app = express();
const PORT = process.env.PORT || 3001;

// Mw de body-parsing pour recup les données en POST
app.use(express.urlencoded({ extended: true }));

// Branchement du router
app.use(router);

// Lancement de l'application
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
