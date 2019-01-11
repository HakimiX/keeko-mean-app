import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
import { NgForm } from '@angular/forms';
import { Customer } from '../shared/customer.model';

declare var M: any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {

  user: Object;

  constructor(private customerService: CustomerService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.authGetCustomers().subscribe(data => {
      this.user = data.user;
    }, err => {
      console.log(err);
      return false;
    });
    this.resetForm();
    this.refreshCustomerList();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }

    this.customerService.selectedCustomer = {
      _id: '',
      name: '',
      email: '',
      phone: null,
      note: ''
    };
  }

  onSubmit(form: NgForm) {
    // Insert or update operation
    if (form.value._id === '') {
      // Consume NodeJS POST API
      this.authService.authPostCustomer(form.value).subscribe((res) => {
        this.user = res.user;
        this.resetForm(form);
        this.refreshCustomerList();
        window.location.reload();
        M.toast({ html: 'Saved successfully', classes: 'rounded'});
      }, err => {
        M.toast({ html: 'Not Authorized', classes: 'rounded'});
      });
    } else {
      this.customerService.putCustomer(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshCustomerList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }

  }

  refreshCustomerList() {
    this.authService.authGetCustomers().subscribe((res) => {
      this.customerService.customers = res as Customer[];
    });
  }

  onEdit(customer: Customer, form: NgForm){
    this.customerService.selectedCustomer = customer;
  }

  reloadPage(){
    window.location.reload();
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete this customer?') === true) {
      this.customerService.deleteCustomer(_id).subscribe((res) => {
        this.refreshCustomerList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
