import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { categoryAllDto } from '../dtos/Category/CategoryAllDto/CategoryAllDto';
import { Observable } from 'rxjs';
import { serviceGetAllDto } from '../dtos/ServiceDto/ServiceGetAllDTO';
import { orderGetAllDto } from '../dtos/OrderDTO/OrderDTOAll';
import { GetProblemAllDto } from '../dtos/Problem/ProblemAllDto';
import { LoginDto } from '../dtos/LoginDTO/LoginDTOs';
import { Router } from '@angular/router';
import { CustomerAllDto } from '../dtos/Customer/CustomerAllDto';
import { serviceGetByIdDto } from '../dtos/ServiceDto/ServiceGetbyIdDTO';
import { orderDtOById } from '../dtos/OrderDTO/OrderDTOByID';
import { categoryCreateDto } from '../dtos/Category/CategoryAllDto/CategoryCreateDtos';
import { serviceCreateDto } from '../dtos/ServiceDto/ServiceCreateDTO';
import { categoryUpdateDto } from '../dtos/Category/CategoryAllDto/CategoryUpdateDto';
import { OnUpdateOrder } from '../dtos/OrderDTO/OrderUpdateDTO';
import { serviceUpdateDto } from '../dtos/ServiceDto/ServiceUpdateDTO';
import { GetProblemAllByIdDto } from '../dtos/Problem/ProblemByIdDTO';
import { categoryByIdDto } from '../dtos/Category/CategoryAllDto/CategoryByIdDto';
import { CustomerByIdDto } from '../dtos/Customer/CustomerByIdDto';
import { ResetPasswordDto } from '../dtos/ResetPassword/ResetPasswordDTO';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';


@Injectable({
  providedIn: 'root'
})
export class MainSericesService {


  private baseURL:string='https://localhost:44305';

  private  token  = localStorage.getItem('token') ;
 
  private userId2=localStorage.getItem('UserId')!;
    private  UserId=parseInt(localStorage.getItem('UserId')!);


  //parseInt(localStorage.getItem('UserId')!)
  constructor(private http:HttpClient ,private router:Router,private toastr:ToastrService) { 

   
  


  }


  
  GetCategoryAll():Observable<categoryAllDto[]>{


    return this.http.get<categoryAllDto[]>(`${this.baseURL}/GetCategoryAll`);
      
  }

  GetCategoryDetails(CategoryId:number): Observable<categoryByIdDto> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
    
    });
  
    return this.http.get<categoryByIdDto>(`${this.baseURL}/GetCategoryById/${CategoryId}`, { headers });
  }

  GetServiceAll(): Observable<serviceGetAllDto[]> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
      'token': `${localStorage.getItem('token') }`
    });
  
    return this.http.get<serviceGetAllDto[]>(`${this.baseURL}/api/Admin/GetAllService`, { headers });
  }

  
  GetServiceDetails(ServiceId:number): Observable<serviceGetByIdDto> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
    //  'token': `${this.token}`
    });
  
    return this.http.get<serviceGetByIdDto>(`${this.baseURL}/GetServiceById/${ServiceId}`, { headers });
  }

  GetUserDetails(UserId:number): Observable<CustomerByIdDto> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
    //  'token': `${this.token}`
    });
  
    return this.http.get<CustomerByIdDto>(`${this.baseURL}/GetUserById/${UserId}`, { headers });
  }



  GetOrderDetails(OrderId:number): Observable<orderDtOById> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
    //  'token': `${this.token}`
    });
  
    return this.http.get<orderDtOById>(`${this.baseURL}/GetOrderById/${OrderId}`, { headers });
  }

  GetProblemDetails(ProblemId:number): Observable<GetProblemAllByIdDto> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
      'token': `${localStorage.getItem('token') }`
    });
  
    return this.http.get<GetProblemAllByIdDto>(`${this.baseURL}/api/Admin/GetProblemById/${ProblemId}`, { headers });
  }



 




  GetOrderAll(value?:boolean|undefined): Observable<orderGetAllDto[]> {
    if(value !=undefined && value!=null){
      const headers = new HttpHeaders({
        'Accept': 'text/plain', 
        'token': `${localStorage.getItem('token') }`
      });
    
      return this.http.get<orderGetAllDto[]>(`${this.baseURL}/api/Admin/GetAllOrder?IsApproved=${value}`, { headers });
    }else{
      const headers = new HttpHeaders({
        'Accept': 'text/plain', 
        'token': `${localStorage.getItem('token') }`
      });
    
      return this.http.get<orderGetAllDto[]>(`${this.baseURL}/api/Admin/GetAllOrder`, { headers });
    }
   
  }



  GetProblemAll(): Observable<GetProblemAllDto[]> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
      'token': `${localStorage.getItem('token') }`
    });
  
    return this.http.get<GetProblemAllDto[]>(`${this.baseURL}/api/Admin/GetAllproblem`, { headers });
  }

  GetUserAll(): Observable<CustomerAllDto[]> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
      'token': `${localStorage.getItem('token')}`
    
    });
  
    return this.http.get<CustomerAllDto[]>(`${this.baseURL}/api/Admin/GetAllUsers`, { headers });
  
  }
 

  CreateCategory(input:categoryCreateDto) : Observable<any>{
    const headers = new HttpHeaders({
     'Accept': 'text/plain', 
     'token': `${localStorage.getItem('token') }`
    
    });


    return this.http.post(`${this.baseURL}/api/Admin/CreateCategory`,input,{headers,responseType: 'text' as 'json' } );

  }

  Createservice(input:serviceCreateDto) : Observable<any>{
    const headers = new HttpHeaders({
     'Accept': 'text/plain', 
     'token': `${localStorage.getItem('token') }`
    
    });


    return this.http.post(`${this.baseURL}/api/Admin/CreateService`,input,{headers,responseType: 'text' as 'json' } );

  }

  
  DeleteCategory(CategoryId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
       'token': `${localStorage.getItem('token') }`
    });
    return this.http.put(`${this.baseURL}/api/Admin/UpdateCategoryActivation?CategoryId=${CategoryId}&value=false `,null,{headers,responseType: 'text' as 'json'});

  }

  DeleteService(ServiceId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
       'token': `${localStorage.getItem('token') }`
    });
    return this.http.put(`${this.baseURL}/api/Admin/UpdateServiceActivation?ServiceId=${ServiceId}&value=false `,null,{headers,responseType: 'text' as 'json'});

  }

  DeleteProblem(ProblemId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
       'token': `${localStorage.getItem('token') }`
    });
    return this.http.put(`${this.baseURL}/api/Admin/UpdateProblemActivation?ProblemId=${ProblemId}&value=false `,null,{headers,responseType: 'text' as 'json'});

  }

  DeleteOrderR(OrderId:number,value:boolean):Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
       'token': `${localStorage.getItem('token') }`
    });
    return this.http.put(`${this.baseURL}/api/Admin/UpdateOrderApprovment?OrderId=${OrderId}&value=${value} `,null,{headers,responseType: 'text' as 'json'});

  }



  DeleteOrder(OrderId:number):Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
       'token': `${localStorage.getItem('token') }`
    });
    return this.http.put(`${this.baseURL}/api/Admin/UpdateOrderActivation?OrderId=${OrderId}&value=false `,null,{headers,responseType: 'text' as 'json'});

  }

  UpdateOrder(input:OnUpdateOrder) : Observable<any>{
    const headers = new HttpHeaders({
     'Accept': 'text/plain', 
     'token': `${localStorage.getItem('token') }`
    
    });


    return this.http.put(`${this.baseURL}/api/Admin/UpdateOrder`,input,{headers,responseType: 'text' as 'json' } );

  }



  ResetPassword(input:ResetPasswordDto) : Observable<any>{
    const headers = new HttpHeaders({
     'Accept': 'text/plain', 
     //'token': `${this.token}`
    
    });


    return this.http.put(`${this.baseURL}/ResetPassword`,input,{headers,responseType: 'text' as 'json' } );

  }


  UpdateCategory(input:categoryUpdateDto) : Observable<any>{
    const headers = new HttpHeaders({
     'Accept': 'text/plain', 
     'token': `${localStorage.getItem('token') }`
    
    });


    return this.http.put(`${this.baseURL}/api/Admin/UpdateCategory`,input,{headers,responseType: 'text' as 'json' } );

  }

  UpdateService(input:serviceUpdateDto) : Observable<any>{
    const headers = new HttpHeaders({
     'Accept': 'text/plain', 
     'token': `${localStorage.getItem('token') }`
    
    });


    return this.http.put(`${this.baseURL}/api/Admin/UpdateService`,input,{headers,responseType: 'text' as 'json' } );

  }
  Login(input:LoginDto):Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
    });

    return this.http.post(`${this.baseURL}/api/Admin/LoginbyAdmin`,input,{ headers , responseType: 'text' as 'json' })


  }

  Logout():Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
    });

    localStorage.setItem('isLoggedIn','false');
    localStorage.removeItem('token');
    return this.http.put(`${this.baseURL}/Logout/${parseInt(localStorage.getItem('UserId')!)}`, parseInt(localStorage.getItem('UserId')!),{ headers , responseType: 'text' as 'json' });
    
   
   
 


  }

  UploadImageServicesProfileAndGetURL(file: File) : Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/UploadImageServicesProfileAndGetURL`, formData, { headers, responseType: 'text' as 'json' })
  }

  UploadImageCategoryProfileAndGetURL(file: File) : Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/UploadImageCategoryProfileAndGetURL`, formData, { headers, responseType: 'text'as 'json' })
  }


}
