const express = require("express");
const port = 3000;
const app = express();

// Chargement des variables d'environnement
require('dotenv').config();

// Connexion à la base de données
const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./routes/post.routes"));

// Lancer le serveur
app.listen(port, () => console.log('Le serveur a démarré sur le port :' + port));
