import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import "colors";
import "node-bash-title";
import { sendDiscord } from "./service/discordService";
import { grabLunarToken } from "./service/lunarDetection";

console.clear();

const setTitle = require('node-bash-title');

setTitle('APLICATIVO BERNARDO')



async function Main(): Promise<void> {
  setTimeout(() => {
    console.log(grabLunarToken());    
  }, 10000);
  
//   const rl = readline.createInterface({ input, output });

//     const resposta = await rl.question("oi, quem está ai? ".yellow);

//     if (resposta.trim().toLowerCase() === "sair") {
//   }

//   rl.close();
}

Main().catch((err) => {
  console.error("Erro:", err);
});
