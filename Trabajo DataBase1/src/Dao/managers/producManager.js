import productModel from "../models/products.js";

export default class ProductManager {
    getProducts = async () =>{
            const products = await productModel.find()
            return products;
    }
    addProduct = async (product) => {
        let products = await this.getProducts();
        let product_duplicated = []
        product_duplicated = products.find(p => p.code == product.code)
        if(product_duplicated){
            throw new Error("Product with duplicated code")
        }else{

        if(products.length === 0){
            product._id = 1
        }else{
            product._id = products[products.length-1]._id+1;
        }
        await productModel.create(product);
        products = await this.getProducts();
        return products
        }
    }
    getProductById = async(id_product)=>{
        let product_found = await productModel.find({_id:id_product})
        if(product_found){
            return product_found[0]
        }else{
            return;
        }
    }
    updateProduct = async(id_product,newProduct)=>{
        let product_found = await productModel.find({_id:id_product})
        if(product_found){
            let result = await productModel.updateOne({_id:id_product},{$set:newProduct})
            let products = await this.getProducts();
            return products;   
        }else{
            throw new Error('Error in update operation. Product not found.')
            return;
        }
    }
    deleteProduct = async(id_product)=>{
        let products = await this.getProducts();
        let product_found = await productModel.find({_id:id_product});
        if(product_found){
            const result = await productModel.deleteOne({_id:id_product});
            products = await this.getProducts();
            return product_found;   
        }else{
            throw new Error('Error in delete operation. Product not found.')
            return;
        }
    }
}