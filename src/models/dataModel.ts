
export interface GameCredentials{
    id: string,
    token: string,
    name: string,
    refreshToken?: string,
    expirationDate: Date,
    // bordoga: boolean // futura feature inovadora
}

export interface decryptedPayload {
    raw: string,
    parsed: GameCredentials;
}