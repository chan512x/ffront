import { Component } from '@angular/core';

import {FormsModule} from '@angular/forms';

import { RouterLink } from '@angular/router';

import { RouterLinkActive } from '@angular/router';

import { RouterOutlet } from '@angular/router';

import { GetresService } from '../getres.service';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ModalService } from '../modal-service.service';
@Component({

  selector: 'app-lpage',

  imports: [FormsModule,RouterOutlet,RouterLink,RouterLinkActive,CommonModule ],

  templateUrl: './lpage.component.html',

  styleUrl: './lpage.component.css'

})

export class LpageComponent {

  showsignin=true

  from:string=''

  to:string=''

  date:string=''

  constructor(private router:Router,private modalService: ModalService) {};
  openAuthModal() {
    this.modalService.openAuthModal();
  }   
  onSubmit(){
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/results'],{
      
        queryParams:{from:this.from,to:this.to, date:this.date}
  
      })
    }
    else
    {
      localStorage.setItem('pendingSearch', JSON.stringify({
        from: this.from,
        to: this.to,
        date: this.date
      }));  
      this.openAuthModal()
    }
    

  }

}
