export interface IDP {
    id: number;
}

export class PrivateContact {
    public created_at: string;
    public id: number;
    public email: string;
    public id_country: IDP;
    public password: string;
}
export class PrivateClient {
    constructor( 
        public created_at: string,
        public id: number,
        public email: string,
        public id_country: IDP,
        public password: string){}
}