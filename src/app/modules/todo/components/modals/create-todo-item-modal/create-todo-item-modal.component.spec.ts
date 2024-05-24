import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTodoItemModalComponent } from './create-todo-item-modal.component';

describe('CreateTodoItemModalComponent', () => {
  let component: CreateTodoItemModalComponent;
  let fixture: ComponentFixture<CreateTodoItemModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTodoItemModalComponent]
    });
    fixture = TestBed.createComponent(CreateTodoItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
