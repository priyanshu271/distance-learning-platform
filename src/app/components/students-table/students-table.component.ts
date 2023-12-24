import { Component } from '@angular/core';
import { StudentsDataService } from 'src/app/services/students-data.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent {
  public studentsInfo: any[] = [];
  public selectedRows: any[] = [];
  public showConfirmation: boolean = false;
  public sortBy: string = '';
  public sortDirection: string = 'asc';

  /**
   * constructor
   * @param studentsData 
   */
  constructor(private studentsData: StudentsDataService) {}

  /**
   * Runs on component initialization
   */
  public ngOnInit() {
    this.loadData();
  }

  /**
   * load initial student data from local json file
   */
  public loadData() {
    this.studentsData.getStudentData().subscribe((response: any[]) => {
      this.studentsInfo = response;
    });
  }

  /**
   * To delete the selected row
   */
 public deleteSelected() {
    this.selectedRows.forEach(selectedRow => {
      const index = this.studentsInfo.indexOf(selectedRow);
      if (index > -1) {
        this.studentsInfo.splice(index, 1);
      }
    });
    this.selectedRows = [];
    this.showConfirmation = false;
  }

  /**
   * 
   * @param index To delete each row individually by pressing delete button icon
   */
 public deleteRow(index: number) {
    this.studentsInfo.splice(index, 1);
  }

  /**
   * To toggle betweeen checkng and unchecking the checkboxes
   */
  public toggleSelected(student: any, event: any): void {
    if (event.target.checked) {
      this.selectedRows.push(student);
    } else {
      this.selectedRows = this.selectedRows.filter((row) => row !== student);
    }
  }

  /**
   * Opens the deletion modal pop up
   */
 public openConfirmation(): void {
    this.showConfirmation = true;
  }

  /**
   * Close the deletion modal pop up 
   */
  public closeConfirmation(): void {
    this.showConfirmation = false;
  }

  /**
   * To sort the columns individually
   * @param column 
   */
  public sortData(column: string) {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }

    this.studentsInfo.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (valA < valB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valA > valB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
