import { readFile } from 'node:fs/promises';
import path from "node:path";
import os from "node:os";

export async function grabLunarToken(): Promise<string>{
    try{
        const caminho =  path.join(os.homedir(),'.lunarclient','settings','game','accounts.json');
        console.log(`path pro lunar: ${caminho}`);
        
        
        return await readFile(caminho, {encoding: 'utf-8'});
    
    }catch(error){
        throw new Error(`deu erro aqui: ${error instanceof Error ? error.message : error}`);
    }

}

