import knex from 'knex';

class ContenedorDB {

    constructor(tabla, config) {

        this.tabla = tabla;
        this.knex = knex(config);
    }

    async listar(id) {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    async listarAll() {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    async guardar(obj) {
        try {
            await this.knex(this.tabla).insert(obj)
                .then(()=> console.log("mensaje guardado"))
                .catch((err)=> {console.log(err); throw err})
        } catch (error) {
            console.error(error);
        }
    }

    async actualizar(elem, id) {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    async borrar(id) {
        try {

        } catch (error) {
            console.error(error)
        }
    }

    async borrarAll() {
        try {
        } catch (error) {
            console.error(error)
        }
    }
}

export default ContenedorDB; 