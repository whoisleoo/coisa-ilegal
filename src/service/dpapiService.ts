import {Dpapi, isPlatformSupported} from "@primno/dpapi";

export async function dpapiDecrypt(blob: string): Promise<void>{
    if(isPlatformSupported){
        const amigoBlob = blob;
        const dataAmigoBlob = Buffer.from(amigoBlob, 'hex');

        try{

            const decryptBuffer = Dpapi.unprotectData(dataAmigoBlob, null, 'CurrentUser');
            const decryptString = decryptBuffer.toString('utf-8');

        }catch(error){

        }
    }else{
        console.error("linux user maldito");
    }

}