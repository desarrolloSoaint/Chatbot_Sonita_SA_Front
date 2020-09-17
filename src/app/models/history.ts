export class IDP {
    public id: number;
}

export class PrivateContact {
    public id: number;
    public email: string;
    public id_country: IDP;
    public password: String;
}

export class plublicontac{
    public id :number;
    public  email: string;
    public id_country: number
}

export class Historial {
   
    public id:number;
    public id_client: plublicontac;
    
    public id_client_private: PrivateContact;
  
  
    public question_client:string;
    public response_soniat:string;
    public time_question_client:string;
    public time_response_soniat:string;
    public expired_time: string;
 

}