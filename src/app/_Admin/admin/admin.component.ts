import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/interfaces/users.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  setusers:users[]=[]
  counter=0;

  constructor(private dataSev:DataService) {
    dataSev.getUsers().subscribe(data =>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.setusers.push(element)
        }
      }
      
      this.nums_fun(this.setusers.length);
      // this.show_users(this.setusers)

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

  // show_users(setusers:users[]){
  //   this.setusers=setusers
  // }


}
