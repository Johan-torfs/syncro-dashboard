import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  users$: Subscription = new Subscription();
  deleteUsers$: Subscription = new Subscription();

  errorMessage: string = '';
  search: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.users$.unsubscribe();
    this.deleteUsers$.unsubscribe();
  }

  add() {
    this.router.navigate(['admin/users/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    this.router.navigate(['admin/users/form'], { state: { id: id, mode: 'edit' } });
  }

  delete(id: number) {
    this.deleteUsers$ = this.userService.deleteUser(id).subscribe({
      next: (v) => this.getUsers(),
      error: (e) => this.errorMessage = e.message
    });
  }

  getUsers() {
    this.users$ = this.userService.getUsers().subscribe(result => {
      this.users = result;
      this.filterUsers();
    });
  }

  filterUsers() {
    if (this.search == '') {
      this.filteredUsers = this.users;
      return;
    }

    this.filteredUsers = this.users.filter(user => {
      var search = this.search.toLowerCase();
      return (
        user.email.toLowerCase().includes(search) || 
        user.firstname?.toLowerCase().includes(search) ||
        user.lastname?.toLowerCase().includes(search) ||
        user.role?.name.toLowerCase().includes(search)
      );
    });
  }
}
