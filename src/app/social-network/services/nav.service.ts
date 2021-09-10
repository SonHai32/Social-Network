import { NavOptions } from './../app-models/nav-options.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private navOption = new Subject<NavOptions | null>();

  setNavOption(option: NavOptions) {
    this.navOption.next(option);
  }

  getOptionAsObs(): Observable<NavOptions | null> {
    return this.navOption.asObservable();
  }
  constructor() {
    this.navOption.next(null);
  }
}
