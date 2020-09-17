
export class Clientes {
    constructor (
        public id,
        public  email: string,
        public id_country: number,
        public created_at: Date
    ){}

}
export interface Cliente{
    id:number;
    email: string;
    id_country: number;
}
