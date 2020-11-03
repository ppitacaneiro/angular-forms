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
    this.loadDataOnForm();
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

  get isCalleInvalid() {
    return this.forma.get('direccion.calle').invalid && this.forma.get('direccion.calle').touched;
  }

  get isCiudadInvalid() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  createForm() {
    this.forma = this.formBuilder.group({
      nombre : ['',[Validators.required,Validators.minLength(5)]],
      apellido : ['',Validators.required],
      email : ['',[Validators.required,Validators.email]],
      direccion : this.formBuilder.group({
        calle : ['', Validators.required],
        ciudad : ['', Validators.required]
      })
    });
  }

  loadDataOnForm() {
    this.forma.setValue(
    {
      nombre: 'Pablo',
      apellido: 'Pita Caneiro',
      email: 'ppitacaneiro@gmail.com',
      direccion: {
        calle: 'C/Santa Cecilia',
        ciudad: 'A Coruña'
      }
    });
  }

  save() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => { control.markAsTouched() });
        } else {
          control.markAsTouched();
        }
      });
    }
    console.log(this.forma);
    this.forma.reset();
  }
}
