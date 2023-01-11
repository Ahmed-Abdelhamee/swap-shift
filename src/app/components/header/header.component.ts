import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    userId =  localStorage.getItem("userID");

  constructor( private auth:Auth , private toastr: ToastrService, private authServ:AuthService) { }

  ngOnInit(): void {
    $(function(){
      $(".show_logOut").hide();
    });
  }

logOut(){
    this.auth.signOut().then(()=>{
      this.toastr.success("LogOut successfully ")
      localStorage.removeItem("userID");
      setTimeout(()=>{window.location.reload()}, 2000)
    }).catch(()=>{
      this.toastr.error("already LogOut")
      localStorage.removeItem("userID")
    })
  }

  toggle(){
    $('.show_logOut').toggle();
  }
}