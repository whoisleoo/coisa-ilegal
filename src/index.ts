import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import "colors";
import "node-bash-title";
import { sendDiscord } from "./service/discordService";

console.clear();

const setTitle = require('node-bash-title');

setTitle('APLICATIVO BERNARDO')



async function Main(): Promise<void> {
  const rl = readline.createInterface({ input, output });

    const resposta = await rl.question("oi, quem está ai? ".yellow);
    await sendDiscord({ token: "Oi", name: "oi", expirationDate: new Date("2026-02-30") });

    if (resposta.trim().toLowerCase() === "sair") {
  }

  rl.close();
}

Main().catch((err) => {
  console.error("Erro:", err);
});
