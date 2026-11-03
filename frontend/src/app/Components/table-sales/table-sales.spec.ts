import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableSales } from './table-sales';

describe('TableSales', () => {
  let component: TableSales;
  let fixture: ComponentFixture<TableSales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSales],
    }).compileComponents();

    fixture = TestBed.createComponent(TableSales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
