import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTicketListComponent } from './admin-ticket-list.component';

describe('AdminTicketListComponent', () => {
  let component: AdminTicketListComponent;
  let fixture: ComponentFixture<AdminTicketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTicketListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
