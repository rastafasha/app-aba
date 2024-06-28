import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/shared/routes/routes';
import { FileSaverService } from 'ngx-filesaver';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import { RolesService } from '../../roles/service/roles.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { BillingService } from '../billing.service';
import { Location } from '@angular/common';

declare var $:any; 
@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.scss']
})
export class BillingListComponent {
  public routes = routes;

  public billingList: any = [];
  dataSource!: MatTableDataSource<any>;

  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalBilling = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<any> = [];
  public totalPages = 0;

  public billing_generals:any = [];
  public billing_id:any;
  public billing_selected:any;
  public text_validation:any;
  public user:any;

  constructor(
    public billingService: BillingService,
    public doctorService: DoctorService,
    private fileSaver: FileSaverService,
    public roleService: RolesService,
    public location: Location,
    ){

  }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.doctorService.closeMenuSidebar();
    this.getTableData();
    this.user = this.roleService.authService.user;
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  isPermission(permission:string){
    if(this.user.roles.includes('SUPERADMIN')){
      return true;
    }
    if(this.user.permissions.includes(permission)){
      return true;
    }
    return false;
  }

  private getTableData(): void {
    this.billingList = [];
    this.serialNumberArray = [];

    this.billingService.listBillings().subscribe((resp:any)=>{
      
      // console.log(resp);

      this.totalBilling = resp.billings.data.length;
      this.billing_generals = resp.billings.data;
      this.billing_id = resp.billings.id;
     this.getTableDataGeneral();
    })

  }

  getTableDataGeneral(){
    this.billingList = [];
    this.serialNumberArray = [];
    
    this.billing_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
       
        this.billingList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.billingList);
    this.calculateTotalPages(this.totalBilling, this.pageSize);
  }
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.billingList = this.dataSource.filteredData;
  }

  public sortData(sort: any) {
    const data = this.billingList.slice();

    if (!sort.active || sort.direction === '') {
      this.billingList = data;
    } else {
      this.billingList = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
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

  private calculateTotalPages(totalBilling: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalBilling / pageSize;
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

  excelExport(){
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const EXCLE_EXTENSION = '.xlsx';

    this.getTableDataGeneral();


    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.billing_generals);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: EXCEL_TYPE});

    this.fileSaver.save(blobData, "billing_db_aba_therapy",)

  }
  csvExport(){
    const CSV_TYPE = 'text/csv';
    const CSV_EXTENSION = '.csv';

    this.getTableDataGeneral();

    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.billing_generals);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'csv', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: CSV_TYPE});

    this.fileSaver.save(blobData, "billing_db_aba_therapy_csv", CSV_EXTENSION)

  }

  txtExport(){
    const TXT_TYPE = 'text/txt';
    const TXT_EXTENSION = '.txt';

    this.getTableDataGeneral();


    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.billing_generals);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: TXT_TYPE});

    this.fileSaver.save(blobData, "billing_db_aba_therapy", TXT_EXTENSION)

  }

  pdfExport(){
    var doc = new jsPDF.jsPDF(); 
    
    const worksheet = XLSX.utils.json_to_sheet(this.billing_generals);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    doc.html(document.body, {
      callback: function (doc) {
        doc.save('billing_db_aba_project.pdf');
      }
    });

  }

}
