import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexResponsive,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
} from 'ng-apexcharts';
import { DataService } from 'src/app/shared/data/data.service';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection, apiResultFormat, patientDashboard } from 'src/app/shared/models/models';

import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/medical/doctors/service/doctor.service';
import { DashboardService } from 'src/app/core/dashboard/service/dashboard.service';
import { GraphicReductionService } from '../../../service/graphic-reduction.service';
import { BipService } from '../../../service/bip.service';
interface data {
  value: string ;
}

export type ChartOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  series: ApexAxisChartSeries | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chart: ApexChart | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xaxis: ApexXAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataLabels: ApexDataLabels | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  grid: ApexGrid | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fill: ApexFill | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  markers: ApexMarkers | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yaxis: ApexYAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stroke: ApexStroke | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: ApexTitleSubtitle | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labels: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responsive: ApexResponsive[] | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plotOptions: ApexPlotOptions | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tooltip: ApexTooltip | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend: ApexLegend | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};
@Component({
  selector: 'app-chart-reduction',
  templateUrl: './chart-reduction.component.html',
  styleUrls: ['./chart-reduction.component.scss']
})
export class ChartReductionComponent {

  public selectedValue: string ='2024';
  @ViewChild('chart') chart!: ChartComponent;
  
  @Input() maladaptiveSelectedSon:any;
  @Input() maladaptive_behavior:any;
  @Input() initial_interesting:any;
  // @Output() cursoD: EventEmitter<any>  = new EventEmitter();// envia la data


  public chartOptionsOne: Partial<ChartOptions>;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   public carousel1: any = [];
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   public carousel2: any = [];
  dataSource!: MatTableDataSource<patientDashboard>;
  slideConfig = { slidesToShow: 3,
    slidesToScroll: 3, 
    centerMode: true, centerPadding: '30px'
  };


  //datos reales
  public bips:any = [];
  public user: any;
  public maladaptiveSelected: any;
  public maladaptive: any;
  public patient_id: any;
  public client_id: any;
  public created_at: Date;
  public session_date: any = [];
  public maladaptives: any = [];
  public session_dates: any = [];
  public number_of_occurrences: number;
  public patient_selected: any = [];
  public client_selected: any = [];


  public query_patient_by_genders:any = [];
  public query_patients_specialities:any = [];
  public query_patients_speciality_porcentaje:any = [];
  public query_income_year:any = [];
  public notesRbts:any = [];
  //datos reales

  constructor(
    private data: DataService,
    public activatedRoute: ActivatedRoute,
    public doctorService: DoctorService,
    public dashboardService : DashboardService,
    public graphicReductionService : GraphicReductionService,
    public bipService:BipService,
    ) {
    this.carousel1 = this.data.carousel1;
    this.carousel2 = this.data.carousel2;

    // this.chartOptionsOne = {
    //   chart: {
    //     height: 170,
    //     type: 'line',
    //     toolbar: {
    //       show: false,
    //     },
    //   },
    //   grid: {
    //     show: true, 
    //     xaxis: {
    //       lines: {
    //         show: false
    //        }
    //      },  
    //     yaxis: {
    //       lines: { 
    //         show: true 
    //        }
    //      },   
    //     },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   stroke: {
    //     curve: 'smooth',
    //   },
    //   series: [
    //     {
    //       name: 'Number of Occurrences',
    //       color: '#00D3C7',
    //       data: [20, 40, 85, 25, 50, 30, 50, 20, 50, 40, 30, 20],
    //     },
    //   ],
    //   xaxis: {
    //     categories: [
    //       'Jan',
    //       'Feb',
    //       'Mar',
    //       'Apr',
    //       'May',
    //       'Jun',
    //       'Jul',
    //       'Aug',
    //       'Sep',
    //       'Oct',
    //       'Nov',
    //       'Dec',
    //     ],
    //   },
    // };

  }

  ngOnInit(): void {
    
    this.maladaptive_behavior
    this.initial_interesting
    console.log(this.maladaptive_behavior);
    

    this.activatedRoute.params.subscribe((resp:any)=>{
      this.client_id = resp.id; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
      // this.patient_id= resp.id // recibe el id del paciente que se esta consultando
      // console.log(this.client_id);
     })
     this.getProfileBip(); // se pide el perfil del paciente por el bip relacionado
     this.getBip(); // se pide el perfil del paciente por el bip relacionado
     
  }

  getBip(){
    this.bipService.getBipByUser(this.client_id).subscribe((resp:any)=>{
      console.log(resp);
      this.created_at = resp.bip.created_at;
      console.log(this.created_at);
    });

  }

  getProfileBip(){
    this.bipService.showBipProfile(this.client_id).subscribe((resp:any)=>{
      console.log(resp);
      this.client_selected = resp;// asignamos el objeto a nuestra variable
      this.patient_id = resp.patient.patient_id;  
      console.log(this.patient_id);

      //traemos la info del usuario 
      if (this.client_selected.type !== null){// si hay o no informacion del paciente
        if (this.client_selected.eligibility == 'yes'){// si el status es positivo para proceder
          this.patient_id = this.client_selected.patient_id;  
        }
      }
      this.getGoalsMaladaptive();
    });

  }

  // angular
  getGoalsMaladaptive(){
    this.graphicReductionService.listMaladaptivesGraphics(this.maladaptive_behavior, this.patient_id).subscribe((resp:any)=>{
     console.log(resp);

     this.notesRbts = resp.noteRbt.data;
     console.log(this.notesRbts);

     // sin usar el json parse
    //  this.maladaptives = resp.noteRbt.data.filter((items:any) => items.maladaptives);
    //  console.log(this.maladaptives);

     this.session_date = resp.noteRbt.data[0].session_date;
    //  this.session_dates = this.session_date.session_date ? new Date(this.notesRbts.data.session_date).toISOString(): '';
    //  this.session_date = this.notesRbts.session_date;
     console.log(this.session_date); // obtiene la data separada

     let jsonObj = JSON.parse(resp.noteRbt.data[0].maladaptives) || ''; //debo entrar al [0]
     this.maladaptives = jsonObj;
     console.log(this.maladaptives); // obtiene la data separada

      // deberia obtener el nombre solicitado
      this.maladaptive = this.maladaptives[0].maladaptive_behavior 
      console.log(this.maladaptive_behavior); //si lo obtiene pero solo 1

     

      // deberia obtener el numero solicitado
      this.number_of_occurrences = this.maladaptives[0].number_of_occurrences 
      console.log(this.number_of_occurrences);// no lo obtiene

      // solo si accedo al [0] si obtiene todo
      this.chartOptionsOne = {
        chart: {
          height: 170,
          type: 'line',
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: true, 
          xaxis: {
            lines: {
              show: false
             }
           },  
          yaxis: {
            lines: { 
              show: true 
             }
           },   
          },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        series: [
          {
            name: 'Number of Occurrences',
            color: '#00D3C7',
            // data: [45, 60, 75, 51, 42, 42, 30],
            data: [this.initial_interesting, this.number_of_occurrences]
          },
        ],
        xaxis: {
          categories: [this.created_at, this.session_date],
          // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
      };
      
     
    },);

    // this.getDashboardAdminYear();

  }

  



  getDashboardAdminYear(){
    let data ={
      year: this.selectedValue,
    }
    this.query_income_year = null;
    this.dashboardService.dashboardAdminYear(data).subscribe((resp:any)=>{
      // console.log(resp);
      

      //start
      this.query_patients_speciality_porcentaje = resp.query_patients_speciality_porcentaje;
      //end
      //start
      this.query_income_year = resp.query_income_year;
      let data_income:any = [];
      this.query_income_year.forEach((element:any) => {
        data_income.push(element.income);
      });

      this.chartOptionsOne = {
        chart: {
          height: 200,
          type: 'line',
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: true, 
          xaxis: {
            lines: {
              show: false
             }
           },  
          yaxis: {
            lines: { 
              show: true 
             }
           },   
          },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        series: [
            {
              name: 'Income',
              color: '#2E37A4',
              data: data_income,
            },
          ],
        xaxis: {
          categories: resp.months_name,
        },
      };
      
      //end
    })
  }
  selectedYear(){
    console.log(this.selectedValue);
    this.getDashboardAdminYear();
  }
    
  selecedList: data[] = [
    {value: '2022'},
    {value: '2023'},
    {value: '2024'},
    {value: '2025'},
    {value: '2026'},
    {value: '2027'},
    {value: '2028'},
    {value: '2029'},
    {value: '2030'},
  ];
  
}
