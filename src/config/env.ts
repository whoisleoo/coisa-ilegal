import dotenv from 'dotenv';
dotenv.config();

const discordWebhook = process.env.DISCORD_WEBHOOK;
if(!discordWebhook){
    throw new Error("WEBHOOK não definido no .env");
}

export const config = { discordWebhook };