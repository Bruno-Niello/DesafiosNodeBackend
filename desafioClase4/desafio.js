const fs = require('fs'); 

class Contenedor {
    constructor(archivo){
        this.archivo = archivo;
    }
    //guardo un objeto nuevo y escribo el archivo de no existir
    async save(obj){
        try {
            const productos = await this.getAll();
            if (!productos) {
                
            } else {

            }

            // let array = [];
            // let id = Math.floor(Math.random() * 999);
            // const newObjeto = {...obj, id: id}
            // array.push(newObjeto);  
            // const productos = await this.getAll();
            // const objeto = JSON.stringify(array, null, 2);

            // await fs.promises.writeFile(this.archivo, objeto, (error)=>{
            //     if(error) {
            //         throw new Error('error de escritura')
            //     }
            //     console.log('escritura exitosa')
            //     })
            // return (objeto.id)
            
            // if(productos == ""){
            //     await fs.promises.writeFile(this.archivo, `[${objeto},]`, (error)=>{
            //         if(error) {
            //             throw new Error('error de escritura')
            //         }
            //         console.log('escritura exitosa')
            //     })
            //     return (objeto.id)
            // }else{

            //     let newArray = productos.map()








            //     // appendFile no me sirvio porque no guarda el array, sino los objetos
            //     let string = JSON.stringify(productos);
            //     // await this.deleteAll();
            //     await fs.promises.appendFile(this.archivo, `${objeto},`);
            //     // productos.push(newObjeto)
            //     // let string = JSON.stringify(productos);
            //     // console.log(productos)


            //     // await fs.promises.unlink(this.archivo);
            //     // await fs.promises.writeFile(this.archivo, string, (error)=>{
            //     //     if(error) {
            //     //         throw new Error('error de escritura')
            //     //     }
            //     //     console.log('escritura exitosa')
            //     // })
            //     return (objeto.id)
            // }


        } catch (error) {
            console.error(error);
        }
    }
    //obtengo un objeto por id
    async getById(id){
        try {
            const productos = await this.getAll();
            const productoId = productos.find(x => x.id == id);
            return productoId;
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
            const productosFiltrados = JSON.stringify(deleteId);
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

    //defino 3 objetos de prueba, los defino

    // let productosNuevos = [
    //     {
    //     title: 'pipa butz choquin',
    //     price: '10000',
    //     thumbnail: 'https://firebasestorage.googleapis.com/v0/b/mefe-pipas.appspot.com/o/pipa-bc01.jpg?alt=media&token=6e328d93-41f8-4350-b503-c3072c43744f'
    //     },
    //     {
    //     title: 'pipa peterson',
    //     price: '15000',
    //     thumbnail: 'https://firebasestorage.googleapis.com/v0/b/mefe-pipas.appspot.com/o/pipa-pe01.jpg?alt=media&token=3a1addb3-192a-46c8-94b8-2a1a0560c3b9' 
    //     },
    //     {
    //     title: 'pipa dunhill',
    //     price: '20000',
    //     thumbnail: 'https://firebasestorage.googleapis.com/v0/b/mefe-pipas.appspot.com/o/pipa-pe01.jpg?alt=media&token=3a1addb3-192a-46c8-94b8-2a1a0560c3b9' 
    //     }
    // ];

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
    //escribo en el archivo los tres productos // ejecutar solo una vez, o cuando se quiera guardar algo
    await productos.save(productosNuevos1);
    await productos.save(productosNuevos2);
    

    //traigo todos los productos a la consola
    let todosLosProductos = await productos.getAll();
    console.log('muestro todos los productos', todosLosProductos);

    //borra todos los archivos // ejecutar solo cuando se desee borrar todo
    // await productos.deleteAll();

    //borrar por id
    // await productos.deleteById();

    //obtener id
    // await productos.getById();
}
    


prueba(); 















