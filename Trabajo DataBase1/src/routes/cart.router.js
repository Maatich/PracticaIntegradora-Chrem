import { Router } from 'express';
import CartManagerMongo from '../Dao/managers/cartManager.js';

const router = Router();

const cartManagerMongo = new CartManagerMongo();

router.post('/', async(request, response) => {
    const respuesta = await cartManagerMongo.createCart();
    response.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });
});

router.post('/:cid/product/:pid', async (request, response) => {
    const cid = request.params.cid;
    const pid = request.params.pid;

    const respuesta = await cartManagerMongo.updateCart(cid, pid);

    response.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });
});

router.delete('/:cid/product/:pid', async (request, response) => {
    const cid = request.params.cid;
    const pid = request.params.pid;

    const respuesta = await cartManagerMongo.deleteProductCart(cid, pid);

    response.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });
});

router.get('/', async(request, response) => {

    const respuesta = await cartManagerMongo.getCarts();

    response.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });
})
router.get('/:cid', async(request, response) => {
    const cid = (request.params.cid);

    const respuesta = await cartManagerMongo.getCart(cid);

    response.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });
});


export default router;