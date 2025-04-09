import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { LpageComponent } from './lpage/lpage.component';

import { SresultsComponent } from './sresults/sresults.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
@Component({

  selector: 'app-root',

  imports: [RouterOutlet,LpageComponent,SresultsComponent,AuthComponent,ProfileComponent],

  templateUrl: './app.component.html',

  styleUrl: './app.component.css'

})

export class AppComponent {

  title = 'frontend2';

}
