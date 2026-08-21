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
  const rawJson = await grabLunarToken();
  await(delay(2000));

  console.log("oi");

  // console.log(`${JSON.parse(teste).accounts.username} conta encontrada `);
  const contas = parseLunar(rawJson);
  console.log("conta:", JSON.stringify(contas[0]));
  await sendDiscord({id: contas[1].id, token: contas[1].token, name: contas[1].name, expirationDate: contas[1].expirationDate, refreshToken: contas[1].refreshToken})
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
