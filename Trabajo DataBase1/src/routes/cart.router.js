import { Router } from 'express';
import CartManager from '../Dao/managers/cartManager.js';

const router = Router();
const manager = new CartManager();


class Cart {
    constructor(products = []) {
      this.products = products;
    }
  }


router.get('/', async (req, res)=>{
    let limit;
    let carts = await manager.getCarts()
    if(req.query.limit){
        limit = req.query.limit
        carts = carts.slice(0,limit)
    }
    
    res.send({
        carts
    })
})

router.post('/', async (req, res)=>{
    const {products} = req.body;
    try {
        let cart = new Cart(products);
        let carts = await manager.addCart(cart);
        res.send({
            carts
        });
    }catch(error){
        res.status(400).send({error:error.message});
    }
})

router.get('/:idcart', async (req,res)=>{

    const idcart = req.params.idcart;

    let cart = await manager.getCartById(idcart)
    let products = cart.products
    let response;
    if(!cart){
        response = {
            error:"cart not found."
        }
        res.status(400).send(response)
    }else{
        res.send({products})
    }
    
})


router.post('/:idcart/product/:idproduct', async (req,res)=>{
    const idcart = req.params.idcart;
    const idproduct = req.params.idproduct;
    try {
        let carts = await manager.addProductInCart(idcart,idproduct)
        res.send(carts)
    }catch(error){
        res.status(400).send({error:error.message})
    }
})

router.delete('/:idcart', async (req, res)=>{
    const idcart = req.params.idcart;
    try {
        let cart_deleted = await manager.deleteCart(idcart)
        res.send({cart_deleted})
    }catch(error){
        res.status(400).send({error:error.message});
    }

})

export default router;