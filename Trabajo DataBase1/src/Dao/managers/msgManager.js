import messageModel from "../models/messages.js";
import messagesModel  from "../models/messages.js";

export default class MessageManager{
    
    async getMessages(){

        try{

            const messageHistory = await messagesModel.find().lean();

            return {
                code: 202,
                status: 'Success',
                message: messageHistory
            };

        } catch (error) {
            
            return {
                code: 400,
                status: 'Error',
                message: `${error}`
            };

        };

    };

    async saveMessage(message){

        try{

            await messageModel.create(message);

        } catch (error) {
            
            return {
                code: 400,
                status: 'Error',
                message: `${error}`
            };

        };

    };

};