import { Component, OnInit } from '@angular/core';
import { swap} from 'src/app/interfaces/swap.interface';
import { users } from 'src/app/interfaces/users.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-show-swap',
  templateUrl: './show-swap.component.html',
  styleUrls: ['./show-swap.component.scss']
})
export class ShowSwapComponent implements OnInit {

  swap:swap[]=[]
  users:users[]=[]


  constructor(private dataServ:DataService) { }

  ngOnInit(): void {
    this.swap=[]
    this.users=[]

    this.swap = this.dataServ.final_swapResult;
    this.users = this.dataServ.final_Users
    }

}
