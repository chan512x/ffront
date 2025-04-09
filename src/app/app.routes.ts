import { Routes } from '@angular/router';

import { LpageComponent } from './lpage/lpage.component';

import { SresultsComponent } from './sresults/sresults.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
export const routes: Routes = [

    {

        path:'',component:LpageComponent

    },

    {

        path:'results',component:SresultsComponent,canActivate: [AuthGuard]

    },

    {

        path:'check',component:AuthComponent

    },
    {

        path:'profile',component:ProfileComponent

    }

];  
