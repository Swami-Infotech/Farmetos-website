import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http:HttpClient) { }

  baseurl = environment.baseURL;



  getalldashboard(){
    return this.http.get(this.baseurl + "Web/GetDashboardData")
  }

  getproductbycategory(CategoryID: number, pageNumber: number) {
    return this.http.get(`${this.baseurl}Web/GetProductsByCategory/${CategoryID}?pageNumber=${pageNumber}`);
  }

  getproductdetails(userProductID:number){
    return this.http.get(this.baseurl + "Web/GetProductDetails/" + userProductID)
  }

  getallwork(pageNumber: number){
    return this.http.get(`${this.baseurl}Web/GetAllWorks?pageNumber=${pageNumber}`)
  }

  getworkdetails(id:number){
    return this.http.get(this.baseurl + "Web/GetWorkById/" + id)
  }

  getallblog(pageNumber: number){
    return this.http.get(`${this.baseurl}Web/GetAllBlog?pageNumber=${pageNumber}`)
  }

  addweblead(data:any){
    return this.http.post(this.baseurl + "Web/AddWebLead",data)
  }

  Addinquiry(data:any){
    return this.http.post(this.baseurl + "Admin/AddNewInquiry",data)
  }

  getblogbyid(blogID:number){
    return this.http.get(this.baseurl + "Web/GetBlogById/" + blogID)
  }
  
}
