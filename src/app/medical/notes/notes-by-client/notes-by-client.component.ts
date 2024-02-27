import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BipService } from '../../bip/service/bip.service';
import { GoalService } from '../../bip/service/goal.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { NoteRbtService } from '../services/note-rbt.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-notes-by-client',
  templateUrl: './notes-by-client.component.html',
  styleUrls: ['./notes-by-client.component.scss']
})
export class NotesByClientComponent {

  patient_id:any;
  doctor_id:any;
  patient_selected:any;
  client_selected:any;
  bip_id:any;
  note_id:any;
  user:any;

  public notesPatientList: any = [];
  public notespatient_generals:any = [];
  dataSource!: MatTableDataSource<any>;
  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalDataNotepatient = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<any> = [];
  public totalPages = 0;
  
  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public goalService:GoalService,
    public router: Router,
    public ativatedRoute: ActivatedRoute,
    public noteRbtService: NoteRbtService,
    public doctorService: DoctorService,
  ){}

  ngOnInit(): void {
    
    // window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.patient_id = resp.id;
      
      // this.patient_id= resp.patient_id;
      // console.log(this.client_id);
     })
     this.getNotesByPatient();
     this.getTableData();
     

    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.doctor_id = this.user.id;
  }

  getNotesByPatient(){
    this.noteRbtService.showNotebyPatient(this.patient_id).subscribe((resp:any)=>{
      console.log(resp);
    })
  }

  

  private getTableData(): void {
    this.notesPatientList = [];
    this.serialNumberArray = [];

    this.noteRbtService.showNotebyPatient(this.patient_id).subscribe((resp:any)=>{
      
      console.log(resp);

      this.totalDataNotepatient = resp.note_rbts.data.length;
      this.notespatient_generals = resp.note_rbts.data;
      this.patient_id = resp.note_rbts.data.patient_id;
     this.getTableDataGeneral();
    })

  }

  public sortData(sort: any) {
    const data = this.notesPatientList.slice();

    if (!sort.active || sort.direction === '') {
      this.notesPatientList = data;
    } else {
      this.notesPatientList = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.notesPatientList = this.dataSource.filteredData;
  }

  getTableDataGeneral(){
    this.notesPatientList = [];
    this.serialNumberArray = [];
    
    this.notespatient_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
       
        this.notesPatientList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.notesPatientList);
    this.calculateTotalPages(this.totalDataNotepatient, this.pageSize);
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableDataGeneral();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableDataGeneral();
    this.searchDataValue = '';
  }

  private calculateTotalPages(totalDatapatient: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalDatapatient / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }

}
