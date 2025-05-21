const { db } = require('./firebase_init.js');
const { collection, setDoc, doc } = require('firebase/firestore');

class FirestoreService {
  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
  }

  async postDocument(customId, dataObject) {
    try {
      const docRef = doc(this.collectionRef, customId.toString());
      await setDoc(docRef, dataObject);
      console.log("Documento creado con ID:", customId);
    } catch (e) {
      console.error("Error al crear el documento:", e);
      throw e;
    }
  }
}

module.exports = { FirestoreService };
