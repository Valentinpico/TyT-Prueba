import { TestBed } from '@angular/core/testing';

import { ToDoStateService } from './to-do-state.service';

describe('ToDoStateService', () => {
  let service: ToDoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
