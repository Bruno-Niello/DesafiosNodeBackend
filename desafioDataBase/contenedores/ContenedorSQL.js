import knex from 'knex';

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async listar(id) {
        try {

            const objetoId = await this.knex.from(this.tabla).select('*')
                .where('id', '=', id)
                .then((x)=>{console.log(x)})
                // .finally(async()=>{
                //     await this.desconectar()
                // })
            return objetoId;

        } catch (error) {
            console.log("hubo un error");
            console.error(error);
        }
    }

    async listarAll() {
        try {
            
            const all = await this.knex.from(this.tabla).select('*')
                .then((x)=> {console.log(x)})
                // .finally(async ()=> {
                //     await this.desconectar();
                // })
            return all;

        } catch (error) {
            console.log("hubo un error");
            console.error(error);
        }
    }

    async guardar(elem) {
        try {

            await this.knex(this.tabla).insert(elem)
                .then(()=> console.log("guardado"))
                .catch((err)=> {console.log(err); throw err})

        } catch (error) {
            console.log("hubo un error");
            console.error(error);
        }
    }

    async actualizar(elem, id) {
        try {

            await this.knex.from(this.table).where('id', id)
                .update({elem})
                .then(()=> console.log("actualizado correctamente"))
                // .finally(async()=>{
                //     await this.desconectar();
                // })
            
        } catch (error) {
            console.log("hubo un error");
            console.error(error);
        }
    }

    async borrar(id) {
        try {

            await this.knex.from(this.table).where('id', id)
                .del()
                .then(()=> console.log("eliminado correctamente"))
                // .finally(async()=>{
                //     await this.desconectar();
                // })
            
        } catch (error) {
            console.log("hubo un error");
            console.error(error);
        }
    }

    async borrarAll() {
        try {

            await this.knex.schema.dropTableIfExists(this.table)
            
        } catch (error) {
            console.log("hubo un error");
            console.error(error);
        }
    }

    async desconectar() {
        try {

            // this.knex.destroy();
            
        } catch (error) {
            console.log("hubo un error");
            console.error(error);
        }
    }
}

export default ContenedorSQL