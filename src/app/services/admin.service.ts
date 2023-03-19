import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';
import { users } from '../interfaces/users.interface';
import { DataService } from 'src/app/services/data.service';
import { Observable} from 'rxjs';
import { setAdmin } from '../interfaces/setAdmin.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  userId:any;
  url=this.database.app.options.databaseURL;
  users:users[]=[]
  AdminData:setAdmin={
    AdminEmail: '' ,
    Admin_userId:'' 
  }
  
  constructor(public auth:Auth , private http : HttpClient , private database:Database, private route:Router, private toastr:ToastrService,private dataServ:DataService) {
    this.userId=localStorage.getItem('swapUserID*')
   }

   addAdmin(adminMail:string){
    this.dataServ.getUsers().subscribe(data=>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.users.push(element);
        }
      }
      this.AdminData.AdminEmail= this.users.find(item => item.email==adminMail)?.email!;
      this.AdminData.Admin_userId= this.users.find(item => item.email==adminMail)?.userID!;
      this.http.post(`${this.url}/setAdmin.json`,this.AdminData).subscribe(()=>{
        setTimeout(()=>{
          window.location.reload()
        },2000)
        this.toastr.success("Admin added successfully! ")
      })
    })
   }

   getAdmin():Observable<setAdmin[]>{
    return this.http.get<setAdmin[]>(`${this.url}/setAdmin.json`);
   }

   findAdmin(){
    this.getAdmin().subscribe(data=>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          if(element.Admin_userId==localStorage.getItem("swapUserID*")){
            localStorage.setItem("Swap_shift_Admin","yes");
          }
        }
      }
    })
   }


   do_deleteItem(key:string){
    this.http.delete(`${this.url}/setAdmin/${key}.json`).subscribe(()=>{
      setTimeout(()=>{
        window.location.reload()
      },2000)
      this.toastr.success("deleted item successfully! ")
    })
   }
}
