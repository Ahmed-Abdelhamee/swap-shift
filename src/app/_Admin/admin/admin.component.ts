import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/interfaces/users.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public users:users[]=[]
  public users_arr_keys:string[]=[]
  counter=0;

  user_key:string=''

  constructor(private dataSev:DataService) {
    dataSev.getUsers().subscribe(data =>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.users.push(element)
          this.users_arr_keys.push(key)
        }
      }
      
      this.nums_fun(this.users.length);

    })
   }

  ngOnInit(): void {
  }

  nums_fun(number:number){
    if(this.counter<number){
      setTimeout(() => {
        this.counter++
        this.nums_fun(number)
      }, 10);
    }else{
      clearInterval
    }
  }


  user_ID:string=''
  user_name:string=''
  user_email:string=''
  user_phone:string=''

  show_user(item:users){
    this.user_ID=item.userID!
    this.user_name=item.name
    this.user_email=item.email
    this.user_phone=item.phone
  }

  set_Key_Delete(user_key:string,item:users){
    this.user_ID=item.userID!
    this.user_name=item.name
    this.user_email=item.email
    this.user_phone=item.phone;

    this.user_key=user_key

  }
  delete_user(user_key:string){
    this.dataSev.delete_user(user_key)
    console.log(user_key)
  }
}
