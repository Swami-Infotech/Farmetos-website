import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/Home/home/home.component';

export const routes: Routes = [
    {
        path: "",
        component: AppComponent,
        children: [
          {
            path: "",
            redirectTo: "/Home",
            pathMatch: 'full'
          }
        ]
      },
      {
        path:"Home",
        component:HomeComponent
      }
];
