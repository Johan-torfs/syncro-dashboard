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

  ngOnInit(): void {
  }
}
