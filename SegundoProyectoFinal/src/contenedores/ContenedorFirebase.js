import { query } from "express";
import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
    this.id = 1;
  }

  async listar(id) {
    try {
      const doc = this.coleccion.doc(`${id}`);
      const object = await doc.get();
      const response = object.data();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async listarAll() {
    try {
      const querySnapshot = await this.coleccion.get();
        let docs = querySnapshot.docs;
        console.log(docs);
      return docs;
    } catch (error) {
      console.log(error);
    }
  }

  async guardar(nuevoElem) {
    try {
      const objects = await this.listarAll();
      const lastElement = objects[objects.length - 1];

      const lastId = parseInt(lastElement.id) + 1;

      let doc = this.coleccion.doc(`${lastId}`);

      const object = {
        ...nuevoElem,
        date: new Date().toLocaleString(),
        id: parseInt(lastId),
      };
      
      await doc.create(object);
    } catch (error) {
      console.log(error);
    }
  }

  async actualizar(nuevoElem, id) {
    try {
      const doc = this.coleccion.doc(`${id}`);
      const object = await doc.update({ ...nuevoElem });
      console.log(object);
      return object;
    } catch (error) {
      console.log(error);
    }
  }

  async borrar(id) {
    try {
      const doc = this.coleccion.doc(`${id}`);
      const object = await doc.delete();
      return object;
    } catch (error) {
      console.log(error);
    }
  }

  async borrarAll() {
    try {
      const doc = this.coleccion.doc();
      const object = await doc.delete();
      return object;
    } catch (error) {
      console.log(error);
    }
  }

  async desconectar() {}
}

export default ContenedorFirebase