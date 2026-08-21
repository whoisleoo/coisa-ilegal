/*
*   Anotação:
*   Preciso pesquisar sobre o read file e extrair campos especificos 
*   de um arquivo em JSON.
*   token, expirationdate, refreshtoken
* 
*/

import { readFile } from "fs";
import { GameCredentials } from "../models/dataModel";
import { parseLunarDate } from "../utils/Date";

export function parseLunar(rawJson: string): GameCredentials[] {
    let jsonLindo: unknown;

    try{
        jsonLindo = JSON.parse(rawJson);
    }catch(error){
        throw new Error("json errado");
    }

    if(typeof jsonLindo !== 'object' || jsonLindo == null || !("accounts" in jsonLindo)){
        throw new Error('não encontrou campo conta');
    }

    const { accounts } = jsonLindo as { accounts: unknown };
    const entries = Object.entries(accounts as Record<string, any>);

    if(entries.length === 0){
        throw new Error('nao achou nada')
    }

    
    return entries.map(([id, dados]): GameCredentials => ({
        id: id,
        token: dados?.token ?? dados?.accessToken ?? "NÃO ENCONTRADO",
        name: dados?.username ?? dados?.displayName ?? "NÃO ENCONTRADO",
        expirationDate: parseLunarDate(dados?.expirationDate ?? dados?.accessTokenExpiresAt),
        refreshToken: dados?.refreshToken ?? "NÃO ENCONTRADO",
    }

));

}