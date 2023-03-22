import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Priority } from '../priority';
import { PriorityService } from '../priority.service';

@Component({
  selector: 'app-priority-list',
  templateUrl: './priority-list.component.html',
  styleUrls: ['./priority-list.component.css']
})
export class PriorityListComponent {
  priorities: Priority[] = [];
  filteredPriorities: Priority[] = [];
  priorities$: Subscription = new Subscription();
  deletePriorities$: Subscription = new Subscription();

  errorMessage: string = '';
  search: string = '';

  constructor(private priorityService: PriorityService, private router: Router) {}

  ngOnInit(): void {
    this.getPriorities();
  }

  ngOnDestroy(): void {
    this.priorities$.unsubscribe();
    this.deletePriorities$.unsubscribe();
  }

  add() {
    this.router.navigate(['admin/priorities/form'], { state: { mode: 'add' } });
  }

  edit(id: number) {
    this.router.navigate(['admin/priorities/form'], { state: { id: id, mode: 'edit' } });
  }

  delete(id: number) {
    this.deletePriorities$ = this.priorityService.deletePriority(id).subscribe({
      next: (v) => this.getPriorities(),
      error: (e) => this.errorMessage = e.message
    });
  }

  getPriorities() {
    this.priorities$ = this.priorityService.getPriorities().subscribe(result => {
      this.priorities = result;
      this.filterPriorities();
    });
  }

  filterPriorities() {
    if (this.search == '') {
      this.filteredPriorities = this.priorities;
      return;
    }

    this.filteredPriorities = this.priorities.filter(priority => {
      var search = this.search.toLowerCase();
      return (
        priority.name.toLowerCase().includes(search)
      );
    });
  }
}
