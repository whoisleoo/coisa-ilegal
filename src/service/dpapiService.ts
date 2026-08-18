import {Dpapi, isPlatformSupported} from "@primno/dpapi";

export async function dpapiDecrypt(blob: string): Promise<string>{
    if(isPlatformSupported){
        const amigoBlob = blob;
        const dataAmigoBlob = Buffer.from(amigoBlob, 'hex');

        try{

            const decryptBuffer = Dpapi.unprotectData(dataAmigoBlob, null, 'CurrentUser');
            const decryptString = Buffer.from(decryptBuffer).toString('utf-8')

            return decryptString;

        }catch(error){
            throw new Error("Erro");
        }
    }else{
                throw new Error("Linux user maldito");
    }

}