import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent {
  employeeForm!: FormGroup;
  isEdit!: false; //puede ser creación o edición
  employeeId!: String;

  //No lo estamos usando, son un ejemplo, los podriamos usar cuando no tenemos mat-form-field
  //
  get name() {
    return this.employeeForm.get('name');
  }

  get surname() {
    return this.employeeForm.get('surname');
  }

  get gender() {
    return this.employeeForm.get('gender');
  }

  get observations() {
    return this.employeeForm.get('observations');
  }

  //El constructor crea el form
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.buildForm();
  }


  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    if (this.employeeId) {
      this.onReadEmployee() //Esto sería on get employee
    }
  }

  buildForm() {
    this.employeeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      surname: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      gender: ['', Validators.required], //genero siempre vacio
      observations: '',
    });
  }

  onSaveEmployee() {
    if (!this.employeeForm.valid) {
      console.error('Formulario inválido.');
      console.error(this.surname?.errors)
      return;
    }
    console.warn(this.employeeForm.value);
  }

  onReadEmployee() {
    const employee = {
      id: 69696969,
      name: 'Alberto',
      surname: 'ElCalvo',
      gender: 'helicopter',
      observations: 'Soy una sepia'
    }

    this.employeeForm.patchValue(employee);
  }
}
