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

  public selectedValue: string ='03';
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
  public sessionDates: any = [];
  
  public maladaptiveBehaviors: any = [];


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
    // console.log(this.maladaptive_behavior);
    

    this.activatedRoute.params.subscribe((resp:any)=>{
      this.client_id = resp.id; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
    
     })
     this.getProfileBip(); // se pide el perfil del paciente por el bip relacionado
     this.getBip(); // se pide el perfil del paciente por el bip relacionado
     this.getGraphicPatientMonth();
  }

  getBip(){
    this.bipService.getBipByUser(this.client_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.created_at = resp.bip.created_at;
      // console.log(this.created_at);
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

  // obtenemos todos las notas filtrandose con el nombre seleccionado traido como input.. this.maladaptive_behavior 
  // junto con el patient_id por si existe otro paciente con el mismo maladaptive

  getGoalsMaladaptive(){
    this.graphicReductionService.listMaladaptivesGraphics(this.maladaptive_behavior, this.patient_id).subscribe((resp:any)=>{
     console.log(resp);
     this.notesRbts = resp.noteRbt.data; //obtiene una lista de notas con 3 json en cada una maladaptives, interventions y replacementes
      
     // en esta parte solo necesito el maladaptive: el nombre: maladaptive_behavior y el numero: number_of_occurrences 

     //aqui entro dentro del array pero en la posicion 0, y traigo los valores del json pero solo la posicion 0.
     // primero quiero obtener todos los json de this.notesRbts y filtrar el nombre que se esta enviando this.maladaptive_behavior
     // segund obtener solo la info del this.maladaptive_behavior, que es lo que se va a mostrar, serian todos los json del array, como 
     // se muestra en el front... con el filtro
    //  let jsonObj = JSON.parse(resp.noteRbt.data[0].maladaptives) || ''; //debo entrar al [0]
    //  this.maladaptives = jsonObj;
    //  console.log(this.maladaptives); 


     this.maladaptives = this.notesRbts.filter(note => note.maladaptives).map(note => note.maladaptives);
     console.log(this.maladaptives);

     // aqui me funciona pero me trae la info en un array [1,2,3] y la necesito fuera 1,2,3 porque van unidas con otra fecha de otro documento
     this.sessionDates = this.notesRbts.filter(note => note.session_date).map(note => note.session_date); // obtenerlas como un string ?
     // filtrar y obtener las fechas del array ?
     
     this.sessionDates.sort();
     console.log(this.sessionDates);
     this.sessionDates.unshift(this.created_at);
     
      
      
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
            data: [32, 30, 56, 56, 56, 42, 30],
            // data: [this.initial_interesting, this.number_of_occurrences]
          },
        ],
        xaxis: {
          //
          categories:  this.sessionDates,
          // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
      };
      
     
    },);

    

  }

  
  

  getGraphicPatientMonth(){
    let data ={
      month: this.selectedValue,
    }
    this.graphicReductionService.graphicPatientMonth(data).subscribe((resp:any)=>{
      console.log(resp);
      

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
  selectedMonth(){
    // console.log(this.selectedValue);
    this.getGraphicPatientMonth();
  }
    
  selecedList: data[] = [
    {value: '01'},
    {value: '02'},
    {value: '03'},
    {value: '04'},
    {value: '05'},
    {value: '06'},
    {value: '07'},
    {value: '08'},
    {value: '09'},
    {value: '10'},
    {value: '11'},
    {value: '12'},
  ];
  
}
