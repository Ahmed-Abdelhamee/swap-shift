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
  counter=0;

  constructor(private dataSev:DataService) {
    dataSev.getUsers().subscribe(data =>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.users.push(element)
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
      }, 50);
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

}