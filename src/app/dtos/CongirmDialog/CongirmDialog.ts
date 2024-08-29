export class  CongirmDialogDtos{

    
    title               :string|undefined
    description          :string|undefined


    constructor(
       
        title: string |undefined,
        description: string |undefined,
     
      ) {
   
        this.title = title;
        this.description = description;

 
      }
    }
