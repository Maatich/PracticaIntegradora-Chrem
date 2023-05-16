import ProductManager from "./producManager.js";
import cartModel from "../models/carts.js";
const productManager = new ProductManager();

export default class CartManager {
    addProductInCart = async (id_cart, id_product) => {
        const productExists = await productManager.getProductById(id_product)
        if(!productExists){
            throw Error('Product not exists.');
        }else{
        let cart_found = await cartModel.find({_id:id_cart})
        if(!cart_found[0]){
            throw Error('Cart not exists.');
            return;
        }else{
            let productsInCart = cart_found[0].products;
            const productIndex = productsInCart.findIndex(product => product._id == id_product)
            if(productIndex !== -1){
                productsInCart[productIndex].quantity = productsInCart[productIndex].quantity + 1
            }else{
                let product = {
                    _id: id_product,
                    quantity : 1
                }
                productsInCart.push(product)
            }
            await cartModel.updateOne({_id:id_cart},{$set:{products:productsInCart}});
            let carts = this.getCarts();
            return carts
            }
        }
        
    }
    getCarts = async () =>{
        const carts = await cartModel.find();
        return carts
    }
    addCart = async (cart) => {
        let carts = await this.getCarts();

        if(carts.length === 0){
            cart._id = 1
        }else{
            cart._id = carts[carts.length-1]._id+1;
        }
        await cartModel.create(cart);
        carts = await this.getCarts();
        return carts
    }
    getCartById = async(id_cart)=>{
        let cart_found = await cartModel.find({_id:id_cart})
        if(cart_found[0]){
            return cart_found[0]
        }else{
            return;
        }
    }
    updateCart = async(id_cart,newCart)=>{
        let carts = await this.getCarts();
        let cart_found = await cartModel.find({_id:id_cart})
        if(cart_found){
            let result = await cartModel.updateOne({_id:id_cart},{$set:newCart})
            carts = this.getCarts();
            return new_carts;   
        }else{
            return 'Error in update operation. cart not found.'
        }
    }

    deleteCart = async(id_cart)=>{
        let cart_found = await cartModel.find({_id:id_cart})
        if(cart_found.length!=0){
            let result = await cartModel.deleteOne({_id:id_cart});
            return cart_found;   
        }else{
            throw new Error('Error in delete operation. Cart not found.')
        }
    }
}