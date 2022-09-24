import mongoose from 'mongoose';
import * as model from "./usuarios.js";



const CRUD = async () => {
    try {
        //conexion base de datos
        const URL = 'mongodb://localhost:27017/ecommerce';
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Base de datos conectada');
        //create
        const user = { nombre: 'bruno', 
            apellido: "niello", 
            email:"mefe@gmail.com", 
            usuario:"BN", 
            password:39695713
        };
        const userSaveModel = new model.usuarios(user);
        const savedUser = await userSaveModel.save();
        console.log(savedUser);

        //read
        const usersRead = await model.usuarios.find({ nombre: 'bruno'});
        console.log(usersRead);

        //update
        const updateUser = await model.usuarios.updateOne({ nomnbre: 'bruno'}, {$set: {password: 1234}});
        console.log(updateUser);

        //delete
        const deletedUser = await model.usuarios.deleteOne({nombre: "bruno"});
        console.log(deletedUser);

        //delete all
        const deleteAll = await model.usuarios.deleteMany({ });
        console.log(deleteAll);

    } catch (error) {
        console.error(error);
    }
}

CRUD(); 