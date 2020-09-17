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

export class Historialecu {
   
    public id:number;
    public id_client: plublicontac;
    
    public id_client_private: PrivateContact;
  
  
    public quiz_one:string;
    public quiz_three:string;
    public quiz_two:string;
    
 

}


