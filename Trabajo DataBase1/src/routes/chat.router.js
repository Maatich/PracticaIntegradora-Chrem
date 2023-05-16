import { Router } from "express";

//File imports
import MessageManager from "../Dao/managers/msgManager.js";

const router = Router();

const messageManager = new MessageManager();

router.get('/', async (request, response) => {
    
    const messageHistory = await messageManager.getMessages();

    response.render('chat', {
        messages: messageHistory.message
    });

});

export default router;