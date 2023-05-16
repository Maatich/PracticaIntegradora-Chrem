
import { Router } from "express";

import productsModel from "../Dao/models/products.js";
import managerAcces from "../Dao/managers/ManagerAcces.js";
import ProductManager from "../Dao/managers/producManager.js";


const router = Router();
const productManager = new ProductManager();
const managerAccess = new managerAcces();
// Obtenemos todos los productos
router.get("/", async (req, res) => {
  await managerAccess.crearRegistro('Obtencion de datos - Lista de productos')
  let allProducts = await productManager.getProducts();
 res.send({allProducts})

});

// Obtenemos un producto según su ID
router.get("/:pid", async (req, res) => {
  await managerAccess.crearRegistro('Producto seleccionado por id')
  const idProduct = parseInt(req.params.pid);
  let productById = await productManager.getProductByID(idProduct);
  const result = await productsModel.find({_id:id})
  res.send({ productById , result });
});

// Agregar un nuevo producto

router.post("/", async (req, res) => {
  try {
    const { tittle, description, prince, stock,  code, category } =
      req.body;
    console.log(tittle,prince, description,stock, code, category);
    if (
      !tittle ||
      !description ||
      !prince ||
      !stock ||
      !code ||
      !category
    ) {
      return res.status(400).send({ message: "Faltan datos" });
    }
    const product = {
      tittle,
      description,
      stock,
      prince,
    
      code,
      category,
    };

    const result = await productsModel.create(product);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Modificar un producto existente
router.put("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const { title, description, price, thumbnail, code, stock, category } =
    req.body;
  const msg = await productManager.updateProduct(
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  );
  res.send(msg);
});

// Eliminar un producto
router.delete("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const msg = await productManager.deleteProduct(id);
  res.send(msg);
});

export default router;