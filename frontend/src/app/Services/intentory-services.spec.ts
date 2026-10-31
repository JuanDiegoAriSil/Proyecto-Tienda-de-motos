import { TestBed } from '@angular/core/testing';
import { InventoryServicess } from './intentory-services';

describe('InventoryServicess', () => {
  let service: InventoryServicess;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryServicess);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
