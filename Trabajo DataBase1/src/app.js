import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import __dirname from './utils.js';
import userRouter from './routes/users.router.js';
import viewRouter from "./routes/chat.router.js";
import cartRouter from './routes/cart.router.js';
import chatRouter from './routes/chat.router.js';
import productRouter from './routes/products.routers.js';
import ProductManager from './Dao/managers/producManager.js';
import MessageManager from './Dao/managers/msgManager.js';
import * as url from 'url';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const PORT = 8080;
const MONGO = 'mongodb+srv://matiichrem:Conegin93@cluster0.bll78uw.mongodb.net/?retryWrites=true&w=majority';
//conectando al servidor de Mongo Atlas
const connection = mongoose.connect(MONGO)
const productManager = new ProductManager();(`${dirname}/files/db.json`)
const app = express();
app.engine('handlebars', handlebars.engine());


app.use(express.json()); 
app.use(express.urlencoded({extended:true}))
app.set('views', dirname+ '/views');
app.set('view engine', 'handlebars');



app.use('/',viewRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chat', chatRouter);



const server = app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
  });
export const io = new Server(server);

io.on('connection', (socket) => {

    console.log(`Socket connected`);

    socket.on('message', async (message) => {
        
        await MessageManager.saveMessage(message);
        
        const messageHistory = await MessageManager.getMessages();

        io.emit('messageLog', messageHistory.message);

    });

    socket.on('authenticated', (data) => {

        socket.broadcast.emit('newUserConnected', data);

    });
    
});



