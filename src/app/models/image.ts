export interface IId {
    id: number;
}
export class Image {
    constructor (        
        
    public    id: string,
    public id_user: IId,
    public id_gender: IId,
    public id_country: IId,
    public identification_card: number,
    
    public names: string,
    public last_names: string,
    public mobile_phone: string,
    public birth_date: string,
    // public image_user: string,
    public local_telephone: string,
    public image_user: any,
       
    ){}
    
}