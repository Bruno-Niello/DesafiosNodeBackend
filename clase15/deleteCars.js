import { options } from "./options/mysqlDB.js";
import knex from "knex";

const knexConnection = knex(options);

knexConnection.from('cars').where('id', 2)
    .del()
    .then(()=> console.log("eliminao"))
    .catch((err)=> {console.log(err); throw err})
    .finally(()=> {
        knexConnection.destroy()
    });