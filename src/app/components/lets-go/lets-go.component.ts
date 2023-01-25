import { Component, OnInit } from '@angular/core';
import { RoutersService } from 'src/app/services/routers.service';

@Component({
  selector: 'app-lets-go',
  templateUrl: './lets-go.component.html',
  styleUrls: ['./lets-go.component.scss']
})
export class LetsGoComponent implements OnInit {

  constructor(private routeServ:RoutersService ) { }

  ngOnInit(): void {
  }

  letsGo(){
    this.routeServ.go_to('')
  }
}
