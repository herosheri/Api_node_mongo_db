const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("La variable d'environnement MONGO_URI n'est pas définie.");
    }

    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connecté");
  } catch (err) {
    console.error('Erreur de connexion à MongoDB :', err);
    process.exit(1);
  }
};

module.exports = connectDB;
