import knex from 'knex'
import config from '../src/config.js'

//------------------------------------------
// productos en MariaDb

try {
    const mariaDbClient = knex(config.mariaDb)

    mariaDbClient.schema.createTable('productos', table => {
        table.increments('id'),
        table.string('nombre'),
        table.string('precio'),
        table.string('foto')
    }).then(()=>{
        console.log('tabla productos en mariaDb creada con éxito')
    })
    
} catch (error) {
    console.log('error al crear tabla productos en mariaDb')
    console.log(error)
}

//------------------------------------------
// mensajes en SQLite3
try {
    const sqliteClient = knex(config.sqlite3)

    sqliteClient.schema.createTable('mensajes', table => {
        table.increments('id'),
        table.string('email'),
        table.string('autor'),
        table.dateTime('fecha')
    }).then(()=>{
        console.log('tabla mensajes en sqlite3 creada con éxito')
    })

    
} catch (error) {
    console.log('error al crear tabla mensajes en sqlite3')
}

