const express = require('express');
const path = require('path');
const { FirestoreService } = require('./nosql/firestore_service.js');
const SqlConnection = require('./sql/connection.js'); 

const app = express();
const port = 3000;

const firestoreService = new FirestoreService("LoginApp");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.post('/register', async (req, res) => {
  const { Nombre, correo, Numero, Contraseña } = req.body;
  if (!Nombre || !correo || !Numero || !Contraseña) {
    return res.status(400).send("Missing fields.");
  }

  const db = new SqlConnection();

  try {
    await db.connectToDb();

    // Insertar en MySQL
    await db.query(
      "INSERT INTO user (name, address, number, password, idEmployers) VALUES (?, ?, ?, ?, ?)",
      [Nombre, correo, Numero, Contraseña, 1]
    );

    // Insertar en Firestore
    await firestoreService.PostDocument(correo, { Nombre, correo, Numero, Contraseña });

    res.status(200).send("User registered in both SQL and Firestore.");
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Error registering user.");
  } finally {
    await db.closeConnection();
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
