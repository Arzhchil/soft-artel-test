import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';

interface BreadCrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  template: `
    <nav *ngIf="breadcrumbs.length > 0">
      <ul class="breadcrumb">
        <li *ngFor="let breadcrumb of breadcrumbs; let last = last">
          <ng-container *ngIf="!last">
            <a [routerLink]="breadcrumb.url">{{ breadcrumb.label }}</a>
          </ng-container>
          <ng-container *ngIf="last">
            <span>{{ breadcrumb.label }}</span>
          </ng-container>
        </li>
      </ul>
    </nav>
  `,
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: BreadCrumb[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.route.root);
      });
  }

  private buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadCrumb[] = []
  ): BreadCrumb[] {
    if (!route.routeConfig || !route.routeConfig.data) {
      return route.firstChild
        ? this.buildBreadCrumb(route.firstChild, url, breadcrumbs)
        : breadcrumbs;
    }

    const label = route.routeConfig.data?.['breadcrumb'];
    if (!label) {
      return route.firstChild
        ? this.buildBreadCrumb(route.firstChild, url, breadcrumbs)
        : breadcrumbs;
    }

    const path = route.routeConfig.path || '';
    const routeParams = route.snapshot.params || {};
    const pathWithParams = path.replace(
      /:([a-zA-Z]+)/g,
      (_, key: string) => routeParams[key] || key
    );

    const nextUrl = `${url}/${pathWithParams}`;

    const breadcrumb: BreadCrumb = {
      label,
      url: nextUrl,
    };
    const newBreadcrumbs = [...breadcrumbs, breadcrumb];

    return route.firstChild
      ? this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs)
      : newBreadcrumbs;
  }
}
