import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faBars,
  faChartLine,
  faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

interface MenuItem {
  title: string;
  icon: IconDefinition;
  path: string;
}

@Component({
  selector: 'app-base-nav',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FontAwesomeModule],
  templateUrl: './base-nav.component.html',
  styleUrl: './base-nav.component.css',
})
export class BaseNavComponent implements OnInit {
  title: string = '';
  menu: MenuItem[] = [
    { title: 'Dashboard', icon: faChartLine, path: '' },
    { title: 'CRUD', icon: faTableColumns, path: 'crud' },
  ];
  faBars = faBars;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.title = this.activatedRoute.snapshot.firstChild?.data['title'];
      }
    });

    this.title = this.activatedRoute.snapshot.firstChild?.data['title'];
  }
}
