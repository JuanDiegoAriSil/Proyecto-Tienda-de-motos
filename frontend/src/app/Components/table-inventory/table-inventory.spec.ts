import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableInventory } from './table-inventory';

describe('TableInventory', () => {
  let component: TableInventory;
  let fixture: ComponentFixture<TableInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableInventory],
    }).compileComponents();

    fixture = TestBed.createComponent(TableInventory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
