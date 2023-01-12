import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { user } from 'rxfire/auth';
import { swap } from 'src/app/interfaces/swap.interface';
import { users } from 'src/app/interfaces/users.interface';
import { DataService } from 'src/app/services/data.service';
import { RoutersService } from 'src/app/services/routers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // boolean variables for control the show
  whereIsSelected:boolean=false;
  holiday:boolean=false;
  shift:boolean=false;
  homeShiftType:boolean=false;
  site:boolean=false;


  // arrays 
  swap_arr:swap[]=[];
  users:users[]=[];

  isUser:boolean=false;

  constructor( private formbuilder:FormBuilder , private http:HttpClient , private dataServ:DataService , private toastr:ToastrService , private route:Router ,private routeServ:RoutersService) {
                this.swap.patchValue({
                  userId:localStorage.getItem('userID')
                })  
                
                this.swap_arr = dataServ.set_Swap_dataArr(); // we call it here because we build it in service
                this.users = dataServ.add_Users_in_arr(); // we call it here because we build it in service 
                //and when we need to use the source to fill arrays we copy the source here in  constructor()
                this.isUser=(localStorage.getItem('userID')) ? true : false
                console.log(this.isUser)
          }


  swap=this.formbuilder.group({
    where:['',Validators.required],
    SwapType:['',Validators.required],
    have_day:['',Validators.required],
    have_shift:[''],
    need_shift:[''],
    shift_type:[''],
    need_day:[''],
    userId:[''],
  })


  ngOnInit(): void { }


  // function for control the conflict between   shift in site  &  shift in home 
  set_where(event:any){
      if(event.target.value=='site'){
        this.homeShiftType=false;
        this.swap.patchValue({
          shift_type:''
        })
      }else{
        this.homeShiftType=true
      }
      this.whereIsSelected=true;
    }
  // function for control the conflict between SwapType  ----->>> shift or holiday
  set_SwapType(event:any){
    if(event.target.value=='holiday'){
      this.holiday=true;
      this.shift=false;
      this.swap.patchValue({
        have_shift:'',
        need_shift:'',
        shift_type:'',
      })
    }else{
      this.shift=true;
      this.holiday=false;
      this.swap.patchValue({
        need_day:''
      })
    }
  }

  
  
  // function for save user request 
  saveSwap(){

    if(!localStorage.getItem('userID')){
        this.toastr.error('',"please login fristly");
        setTimeout(()=>{this.route.navigate(['/login'])}, 2000)
    }else{
      if( this.swap.valid ==true){
        this.dataServ.sendData(this.swap.value,this.swap_arr);
        let swap_result = this.dataServ.filters(this.swap.value , this.swap_arr);
        let swappers=this.dataServ.get_theSwaper_arr(swap_result)
        this.dataServ.shareSwap(swap_result,swappers);
        console.log(this.swap.value)
        console.log(swap_result)
        console.log(swappers)
        this.route.navigate(['/show-swap']);
      }else{
        this.toastr.error('',"please enter valid data");
      }
    }
  }


  routes(link:string){
    this.routeServ.go_to(link)
  }
}
