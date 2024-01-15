import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarServiceService {
  toggled = false;
  
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }
}
