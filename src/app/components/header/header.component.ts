import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { RoutersService } from 'src/app/services/routers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    userId =  localStorage.getItem("swapUserID");

  constructor( private auth:Auth , private toastr: ToastrService, private authServ:AuthService, private routeServ:RoutersService,private route:Router) { }

  ngOnInit(): void {
    $(function(){
      $(".show_logOut").hide();
    });
  }

  routes(link:string){
    this.routeServ.go_to(link)
  }
  SwapHome(){
    window.location.reload()
  }

logOut(){
    this.auth.signOut().then(()=>{
      this.toastr.success("LogOut successfully ")
      localStorage.removeItem("swapUserID");
      setTimeout(()=>{this.route.navigate(['/login'])}, 2000)
      // setTimeout(()=>{window.open("https://ahmed-abdelhamee.github.io/swap-shift/","_self")}, 2000)
    }).catch(()=>{
      this.toastr.error("already LogOut")
      localStorage.removeItem("swapUserID")
    })
  }

  toggle(){
    $('.show_logOut').toggle();
  }
}
