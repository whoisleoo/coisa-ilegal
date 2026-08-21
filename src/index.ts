import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import "colors";
import "node-bash-title";
import { sendDiscord } from "./service/discordService";
import { grabLunarToken } from "./service/lunarDetection";
import { setTimeout } from "node:timers/promises";
import { parseLunar } from "./service/parserService";

console.clear();

const setTitle = require('node-bash-title');
const delay = (ms: number) => setTimeout(ms);

setTitle('APLICATIVO BERNARDO')



async function Main(): Promise<void> {
  await(delay(2000));

  // Teste pra ver se tá puxando
  const refresh = parseLunar(await grabLunarToken());
  console.log(refresh);

  await(delay(20000));
 
  
//   const rl = readline.createInterface({ input, output });

//     const resposta = await rl.question("oi, quem está ai? ".yellow);

//     if (resposta.trim().toLowerCase() === "sair") {
//   }

//   rl.close();
}

Main().catch((err) => {
  console.error("Erro:", err);
});
