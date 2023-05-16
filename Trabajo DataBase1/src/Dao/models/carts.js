import mongoose from 'mongoose';

const collection = 'carts';



const schema = new mongoose.Schema({
    products:{
        type:Array,
        require:false
    },
    _id:{
        type:Number,
        require:false
    }
})

const cartModel = mongoose.model(collection,schema);
export default cartModel;