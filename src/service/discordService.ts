import axios from "axios";
import { dataModel } from "../models/dataModel";
import { config } from "../config/env";

export async function sendDiscord(data: dataModel): Promise<void>{
    const { token, name, expirationDate } = data;
    try{
        const response = await axios.post(config.discordWebhook, {
            content: `Token: ${token} \n Conta: ${name} \n Expira em: ${expirationDate.toISOString()}`
        });

        console.log("Webhook enviado. ", response.status);

    }catch(error){
        if(axios.isAxiosError(error)){
            console.warn("Deu erro.", error.response?.data ?? error.message);

        }else{
            console.warn("Deu um erro que eu n sei oque é", error);
        }
        throw error;
    }

}