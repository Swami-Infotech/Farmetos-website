import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/Home/home/home.component';
import { ProductListComponent } from './Component/ProductList/product-list/product-list.component';
import { HeaderComponent } from './Component/Header/header/header.component';
import { FooterComponent } from './Component/Footer/footer/footer.component';
import { BlogComponent } from './Component/Blog/blog/blog.component';
import { WorkDetailsComponent } from './Component/WorkDetails/work-details/work-details.component';
import { OurWorkComponent } from './Component/OurWork/our-work/our-work.component';
import { AboutComponent } from './Component/AboutUs/about/about.component';

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
      },
      {
        path:"ProductList",
        component:ProductListComponent
      },
      {
        path:"Header",
        component:HeaderComponent
      },
      {
        path:"Footer",
        component:FooterComponent
      },
      {
        path:"Blog",
        component:BlogComponent
      },
      {
        path:"WorkDetails",
        component:WorkDetailsComponent                                                                                                 
      },
      {
        path:"OurWork",
        component:OurWorkComponent
      },
      {
        path:"About",
        component:AboutComponent
      }
];  
