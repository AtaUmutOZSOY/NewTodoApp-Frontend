import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAppLayoutComponent } from './todo-app-layout.component';

describe('TodoAppLayoutComponent', () => {
  let component: TodoAppLayoutComponent;
  let fixture: ComponentFixture<TodoAppLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoAppLayoutComponent]
    });
    fixture = TestBed.createComponent(TodoAppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
