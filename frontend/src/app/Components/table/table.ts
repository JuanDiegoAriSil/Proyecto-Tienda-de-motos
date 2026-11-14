
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  styleUrl: './table.css',
  templateUrl: './table.html',
  imports: [CommonModule, MatTableModule],
})
export class Table implements OnChanges {

  @Input() data: any[] = [];

  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.displayedColumns = Object.keys(this.data[0] ?? {});
    }
  }
}
