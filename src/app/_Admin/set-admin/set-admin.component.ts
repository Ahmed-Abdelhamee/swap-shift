import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { setAdmin } from 'src/app/interfaces/setAdmin.interface';
import { users } from 'src/app/interfaces/users.interface';
import { AdminService } from 'src/app/services/admin.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-set-admin',
  templateUrl: './set-admin.component.html',
  styleUrls: ['./set-admin.component.scss']
})
export class SetAdminComponent implements OnInit {

  constructor(private adminServ:AdminService, private formbuilder:FormBuilder, private dataServ:DataService) { }

  admins:setAdmin[]=[]
  admins_key_arr:string[]=[]

  name:string='';
  email:string='';
  phone:string='';
  userId:string='';

  sepcefic_Admin_key:string=''

  addAdmin=this.formbuilder.group({
    email:['',Validators.required]
  })

  ngOnInit(): void {
    this.adminServ.getAdmin().subscribe(data =>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.admins.push(element)
          this.admins_key_arr.push(key)
        }
      }
      // console.log(this.admins)
    })
  }

  admin(){
    this.adminServ.addAdmin(this.addAdmin.get("email")?.value);
  }

  show(Admin_userId:string){
    this.dataServ.getUsers().subscribe(data=>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          if(Admin_userId==element.userID){
            this.name=element.name;
            this.email=element.email;
            this.phone =element.phone;
            this.userId =element?.userID!;
          }
        }
      }
    })
  }

  deleteItem(key:string){
    this.sepcefic_Admin_key=key;
  }

  do_deleteItem(){
    this.adminServ.do_deleteItem(this.sepcefic_Admin_key);

  }

}

