import { options } from "./options/mysqlDB.js";
import knex from "knex";

const knexConnection = knex(options);

const cars = [
    {name: "audi", price: 12354},
    {name: "fiat", price: 12354},
    {name: "ford", price: 12354},
    {name: "chevrolet", price: 12354},
    {name: "bmw", price: 12354}
]

knexConnection('cars').insert(cars)
    .then(()=> console.log("datos insertados"))
    .catch((err)=> {console.log(err); throw err})
    .finally(()=> {
        knexConnection.destroy()
    });
