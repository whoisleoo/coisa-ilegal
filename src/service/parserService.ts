/*
*   Anotação:
*   Preciso pesquisar sobre o read file e extrair campos especificos 
*   de um arquivo em JSON.
*   token, expirationdate, refreshtoken
* 
*/

import { readFile } from "fs";
import { GameCredentials } from "../models/dataModel";

export function parseLunar(rawJson: string): GameCredentials[] {
    try{
        const jsonLindo = JSON.parse(rawJson);

        let accounts: any[];

        // eu nao aguento mais
        if(jsonLindo.account && typeof jsonLindo.account === 'object'){
            accounts = Object.values(jsonLindo);
        }

    
        const account = jsonLindo.account.find((a : any) => a.refreshToken) || jsonLindo.accounts[0];
        if(!account?.refreshToken){
            throw new Error("token n encontrado lol");
        }
    
        return account.refreshToken;
    }catch(error){
        throw new Error(`falhou essa bomba de token: ${error instanceof Error ? error.message : error}`);
    }
   

}