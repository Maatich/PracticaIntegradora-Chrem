import mongoose from 'mongoose';

const collection = 'Usuarios';

const schema = new mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    apellido:{
        type: String,
        require: true
    },
    edad:{
        type:Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    clientCode: {
        type: String,
        unique: true
    }

})

const userModel = mongoose.model(collection,schema);
export default userModel;