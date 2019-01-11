import { HttpModule, Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Customer } from './customer.model';

@Injectable()
export class CustomerService {

  authToken: any;
  user: any;

  selectedCustomer: Customer;
  customers: Customer[];  // array of customers
  readonly baseURL = 'http://localhost:3000/customers';

  constructor(private http: Http) { }

  // Consume NodeJS POST API - localhost:3000/customers/
  postCustomer(customer: Customer) {
    return this.http.post(this.baseURL, customer);
  }

  getCustomerList() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseURL).map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  putCustomer(customer: Customer) {
    return this.http.put(this.baseURL + `/${customer._id}`, customer);
  }

  deleteCustomer(_id: string){
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
