import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma:FormGroup;

  constructor(private formBuilder:FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  get isNameInvalid() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get isApellidoInvalid() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get isEmailInvalid() {
    return this.forma.get('email').invalid && this.forma.get('email').touched;
  }

  createForm() {
    this.forma = this.formBuilder.group({
      nombre : ['',[Validators.required,Validators.minLength(5)]],
      apellido : ['',Validators.required],
      email : ['',[Validators.required,Validators.email]]
    });
  }

  save() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    console.log(this.forma);
  }
}
