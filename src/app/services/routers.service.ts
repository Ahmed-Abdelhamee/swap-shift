import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutersService {

  constructor(private route:Router) { }

  go_to(link:string){
    this.route.navigate([`/${link}`])
  }

}
