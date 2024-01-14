import { Component, OnInit } from '@angular/core';
import { CrudService } from './crud.service';
import { CommonModule } from '@angular/common';
import {
  faExclamationCircle,
  faPencil,
  faPlus,
  faTrash,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './crud-list.component.html',
  styleUrl: './crud-list.component.css',
  providers: [CrudService],
})
export class CrudListComponent implements OnInit {
  data: any[] = [];
  icon = {
    plus: faPlus,
    edit: faPencil,
    delete: faTrash,
    close: faX,
    exclamation: faExclamationCircle,
  };
  showModal = false;
  selectedItemId!: number;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.getTodos().subscribe((data) => {
      this.data = data;
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  showDeleteModal(id: number) {
    this.selectedItemId = id;
    this.showModal = true;
  }

  onDelete(id: number) {
    this.crudService.deleteTodo(id).subscribe(() => {
      this.data = this.data.filter((item) => item.id !== id);
      this.selectedItemId = 0;
      this.showModal = false;
      alert('Item deleted successfully!');
    });
  }
}
