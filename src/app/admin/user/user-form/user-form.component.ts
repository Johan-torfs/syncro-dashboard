import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from '../../role/role';
import { RoleService } from '../../role/role.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  userId: number = 0;

  user: User = { id: 0, firstname: "", lastname: "", email: "", password: "", token: "" };
  roles: Role[] = [];

  isSubmitted: boolean = false;
  errorMessage: string = "";

  user$: Subscription = new Subscription();
  roles$: Subscription = new Subscription();
  postUser$: Subscription = new Subscription();
  putUser$: Subscription = new Subscription();

  userForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    roleId: new FormControl(0),
    password: new FormControl(''),
  });

  constructor(private router: Router, private userService: UserService, private roleService: RoleService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.userId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    this.roles$ = this.roleService.getRoles().subscribe(result => {
      this.roles = result;
    });

    if (this.userId != null && this.userId > 0) {
      this.user$ = this.userService.getUserById(this.userId).subscribe(result => {
        this.userForm.setValue({
          firstname: result.firstname || "",
          lastname: result.lastname || "",
          email: result.email,
          roleId: result.role?.id || 0,
          password: "",
        });
      });
    }

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
    this.roles$.unsubscribe();
    this.postUser$.unsubscribe();
    this.putUser$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postUser$ = this.userService.postUser(this.userForm.value as User).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/users"),
        error: (e) => this.errorMessage = e.message
      });
    }
    if (this.isEdit) {
      delete this.userForm.value.password;
      this.putUser$ = this.userService.patchUser(this.userId, this.userForm.value as User).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/users"),
        error: (e) => this.errorMessage = e.message
      });
    }
  }

  back() {
    this.router.navigateByUrl("/admin/users");
  }
}
