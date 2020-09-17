export interface IId {
    id: number;
}
export class DataPrivate {
    public created_at: string;
    public mensaje: string;
    public id_client_private: IId;
    public id: number;
    public identification_card: number;
    public birth_date: Date;
    public last_names: string;
    public names: string;
    public mobile_phone: string;
    constructor() { }
}
