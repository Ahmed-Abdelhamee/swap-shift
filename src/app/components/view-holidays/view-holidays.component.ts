import { Component, OnInit } from '@angular/core';
import { swap } from 'src/app/interfaces/swap.interface';
import { users } from 'src/app/interfaces/users.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view-holidays',
  templateUrl: './view-holidays.component.html',
  styleUrls: ['./view-holidays.component.scss']
})
export class ViewHolidaysComponent implements OnInit {

  where:string='';
  day:string='';

  swap_arr:swap[]=[]
  users:users[]=[]

  get_holidays:swap[]=[]
  get_users:users[]=[]

  clicked_1:boolean=false;
  clicked_2:boolean=false;

  wait:boolean=false;

  constructor(private dataServ:DataService) { }

  ngOnInit(): void {   // for initialize the arrays that we want to get from firebase 
    this.dataServ.getData().subscribe(data => {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.swap_arr.push(element)
        }
      }
    })
    this.dataServ.getUsers().subscribe(data=>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.users.push(element);
        }
      }
    })
  }


  view_get_holidays(){
    this.get_holidays=[]
    this.get_users=[]
    if(this.day !='' && this.where !='' && this.day !=undefined && this.where !=undefined){
      this.wait=true
      this.dataServ.getData().subscribe(data=>{
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            this.swap_arr.push(element)
          }
        }
      })
      this.dataServ.getUsers().subscribe(data=>{
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            this.users.push(element);
          }
        }
      })
      
        // console.log(this.swap_arr.length)

        this.get_holidays=this.swap_arr.filter(item=> (this.day == item.have_day && this.where==item.where && item.SwapType=="holiday"))

        for (const top of this.get_holidays) {
          this.get_users.push(this.users.find(item=> item.userID == top.userId)!)
        }
        
      // console.log(this.get_shifts)
      // console.log(this.get_users)
      this.wait=false;

      this.swap_arr=[]
      this.users=[]
    }
  }


  
  clicked1(){
    this.clicked_1=true
  }
  clicked2(){
    this.clicked_2=true
  }
}
