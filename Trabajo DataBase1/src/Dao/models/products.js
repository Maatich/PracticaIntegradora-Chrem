import mongoose from 'mongoose';

const collection ='Productos';

const schema = new mongoose.Schema({

    tittle:{
        type:String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    prince: {
        type: Number,
        require: true
    },
    code: {
        type: String,
        unique: true
    },
    stock: {
        type: String,
        require: true
    },
    category : {
        type: String,
        require: true
    }

})


const productModel = mongoose.model(collection, schema);
export default productModel;