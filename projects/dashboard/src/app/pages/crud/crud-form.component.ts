import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from './crud.service';
import { Crud } from './crud';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crud-form.component.html',
  styleUrl: './crud-form.component.css',
  providers: [CrudService],
})
export class CrudFormComponent implements OnInit {
  crud!: Crud;
  crudForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private crudService: CrudService
  ) {
    this.crudForm = this.createCrudForm(this.formBuilder);
  }

  ngOnInit(): void {
    let crudId = this.activatedRoute.snapshot.paramMap.get('id');
    crudId &&
      this.crudService.getTodo(+crudId).subscribe((data) => {
        this.crud = data;
        this.crudForm.patchValue(this.crud);
      });
  }

  createCrudForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      id: [0, []],
      title: [null, [Validators.required]],
      completed: [false, []],
    });
  }

  get f() {
    return this.crudForm.controls;
  }

  back() {
    this.router.navigate(['crud']);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.crudForm.invalid) {
      return;
    }

    this.crudService.createOrUpdateTodo(this.crudForm.value).subscribe(
      (data) => {
        alert('Todo save successfully.');
        this.crudForm.patchValue(data);
      },
      (error) => {
        alert(error);
      }
    );
  }
}
