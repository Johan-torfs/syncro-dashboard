import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Priority } from '../priority';
import { PriorityService } from '../priority.service';

@Component({
  selector: 'app-priority-form',
  templateUrl: './priority-form.component.html',
  styleUrls: ['./priority-form.component.css']
})
export class PriorityFormComponent {
  isAdd: boolean = false;
  isEdit: boolean = false;
  priorityId: number = 0;

  priority: Priority = { id: 0, name: "", color: "" };
  colors: string[] = ["#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF", "#4B0082", "#EE8240"];

  isSubmitted: boolean = false;
  errorMessage: string = "";

  priority$: Subscription = new Subscription();
  postPriority$: Subscription = new Subscription();
  putPriority$: Subscription = new Subscription();

  priorityForm = new FormGroup({
    name: new FormControl(''),
    color: new FormControl('')
  });

  constructor(private router: Router, private priorityService: PriorityService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.['mode'] === 'edit';
    this.priorityId = +this.router.getCurrentNavigation()?.extras.state?.['id'];

    if (!this.isAdd && !this.isEdit) {
      this.isAdd = true;
    }

    if (this.priorityId != null && this.priorityId > 0) {
      this.priority$ = this.priorityService.getPriorityById(this.priorityId).subscribe(result => {
        this.priorityForm.setValue({
          name: result.name,
          color: result.color
        });
      });
    }

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.priority$.unsubscribe();
    this.postPriority$.unsubscribe();
    this.putPriority$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postPriority$ = this.priorityService.postPriority(this.priorityForm.value as Priority).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/priorities"),
        error: (e) => this.errorMessage = e.message
      });
    }
    if (this.isEdit) {
      this.putPriority$ = this.priorityService.patchPriority(this.priorityId, this.priorityForm.value as Priority).subscribe({
        next: (v) => this.router.navigateByUrl("/admin/priorities"),
        error: (e) => this.errorMessage = e.message
      });
    }
  }

  changeColor(color: string) {
    this.priorityForm.controls['color'].setValue(color);
  }

  back() {
    this.router.navigateByUrl("/admin/priorities");
  }
}
