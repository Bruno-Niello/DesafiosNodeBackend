const fs = require('fs'); 

// const { promises: fs } = require('fs');

class Contenedor {
    constructor(archivo){
        this.archivo = archivo;
    }

    //guardo un objeto nuevo y escribo el archivo de no existir
    async save(obj){

        let id = 0;
        let objeto;
        let array = [];

        try {

            const productos = await this.getAll();

            if(productos){

                const arrayFiltrado = productos.map(item => item.title);
                const comprobacion = arrayFiltrado.includes(obj.title);

                if(comprobacion === false) {
                
                    id = 1 + parseInt(productos.length);
                    const newObjeto = {...obj, id: id};
                    array.push(...productos, newObjeto);  
                    objeto = JSON.stringify(array, null, 2);

                    await fs.promises.writeFile(this.archivo, objeto, (error)=>{
                        if(error) {
                            throw new Error('error de escritura')
                        }
                        console.log('escritura exitosa')
                        })
                    return (objeto.id)
                }
            } else { 
                id = 1;
                const newObjeto = {...obj, id: id};
                array.push(newObjeto); 
                objeto = JSON.stringify(array, null, 2);

                await fs.promises.writeFile(this.archivo, objeto, (error)=>{
                    if(error) {
                        throw new Error('error de escritura')
                    }
                    console.log('escritura exitosa')
                    })
                return (objeto.id)
            }

        } catch (error) {
            console.error(error);
        }
    }
    //obtengo un objeto por id
    async getById(id){
        try {
            const productos = await this.getAll();
            const productoId = productos.find(x => x.id == id);
            return console.log(productoId);
        } catch (error) {
            console.error(error);
        }
    }
    //obtengo todos los objetos del archivo
    async getAll(){
        try {
            const productos = await fs.promises.readFile(this.archivo, 'utf-8');
            const productosArray = JSON.parse(productos);
            return productosArray
        } catch (error) {
            console.error(error);
        }
    }
    //elimino un objeto por id
    async deleteById(id){
        try {
            const productos = await this.getAll();
            const deleteId = productos.filter(x => x.id !== id);
            const productosFiltrados = JSON.stringify(deleteId, null, 2);
            await fs.promises.writeFile(this.archivo, productosFiltrados, (error)=>{
                if(error) {
                    throw new Error('error de borrado')
                }
                console.log('borrado exitoso')
            })

        } catch (error) {
            console.error(error)
        }
        

    }
    //borro todos los productos del archivo
    async deleteAll(){
        try {
            await fs.promises.unlink(this.archivo);
            await fs.promises.writeFile(this.archivo, "", (error)=>{
                if(error) {
                    throw new Error('error de borrado')
                }
                console.log('borrado exitoso')
            })
        } catch (error) {
            console.error(error)
        }
    }

}


// ejercicio de prueba:

const prueba = async () => {

    const productos = new Contenedor('./productos.txt');


    let productosNuevos1 = {
            title: 'pipa dunhill',
            price: '20000',
            thumbnail: 'https://firebasestorage.googleapis.com/v0/b/mefe-pipas.appspot.com/o/pipa-pe01.jpg?alt=media&token=3a1addb3-192a-46c8-94b8-2a1a0560c3b9' 
    }
    let productosNuevos2 = {
            title: 'pipa peterson',
            price: '15000',
            thumbnail: 'https://firebasestorage.googleapis.com/v0/b/mefe-pipas.appspot.com/o/pipa-pe01.jpg?alt=media&token=3a1addb3-192a-46c8-94b8-2a1a0560c3b9' 
    }
    let productosNuevos3 = {
        title: 'pipa mefe',
        price: '20000',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/mefe-pipas.appspot.com/o/pipa-pe01.jpg?alt=media&token=3a1addb3-192a-46c8-94b8-2a1a0560c3b9' 
    }
    let productosNuevos5 = {
        title: 'pipa mefistofeles',
        price: '20000',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/mefe-pipas.appspot.com/o/pipa-pe01.jpg?alt=media&token=3a1addb3-192a-46c8-94b8-2a1a0560c3b9' 
    }

    //traigo todos los productos a la consola
    let todosLosProductos = await productos.getAll();
    console.log('muestro todos los productos', todosLosProductos);

    //escribo en el archivo los tres productos // ejecutar solo una vez, o cuando se quiera guardar algo

    await productos.save(productosNuevos1);
    await productos.save(productosNuevos2);
    await productos.save(productosNuevos3);
    await productos.save(productosNuevos3);
    await productos.save(productosNuevos5);
    
    //borra todos los archivos // ejecutar solo cuando se desee borrar todo

    // await productos.deleteAll();

    //borrar por id

    // await productos.deleteById(2);

    //obtener id

    // await productos.getById(1);


}
    
prueba(); 














