import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTicketFormComponent } from './admin-ticket-form.component';

describe('AdminTicketFormComponent', () => {
  let component: AdminTicketFormComponent;
  let fixture: ComponentFixture<AdminTicketFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTicketFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
