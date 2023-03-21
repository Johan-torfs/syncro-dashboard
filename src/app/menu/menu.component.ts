import { Component, OnInit } from '@angular/core';
import { AuthService } from '../security/auth.service';

import { Dropdown } from "flowbite";
import type { DropdownOptions, DropdownInterface } from "flowbite";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(public authService: AuthService) { }

  targetEl = document.getElementById('dropdownMenu');

  triggerEl = document.getElementById('dropdownButton');

  options: DropdownOptions = {
    placement: 'bottom',
    offsetSkidding: 0,
    offsetDistance: 10,
    onHide: () => {
        console.log('dropdown has been hidden');
    },
    onShow: () => {
        console.log('dropdown has been shown');
    }
  };

  ngOnInit(): void {
    if (this.targetEl) {
      /*
      * targetEl: required
      * triggerEl: required
      * options: optional
      */
      const dropdown: DropdownInterface = new Dropdown(this.targetEl, this.triggerEl, this.options);
  
      // show the dropdown
      dropdown.show();
  }
  }
}
