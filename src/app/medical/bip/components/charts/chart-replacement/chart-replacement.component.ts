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
import { style } from '@angular/animations';
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
  selector: 'app-chart-replacement',
  templateUrl: './chart-replacement.component.html',
  styleUrls: ['./chart-replacement.component.scss']
})
export class ChartReplacementComponent {
  public selectedValue: string ='03';
  @ViewChild('chart') chart!: ChartComponent;
  
  @Input() goal:any;
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
  public replacements: any = [];
  public session_dates: any = [];
  public number_of_occurrences: number;
  public patient_selected: any = [];
  public client_selected: any = [];
  public sessionDates: any = [];
  public replacement: any = [];
  
  public maladaptiveBehaviors: any = [];
  public replacementsExtractedGoal: any = [] = [{}];
  public number_of_correct_response: any ;


  public query_patient_by_genders:any = [];
  public query_patients_specialities:any = [];
  public query_patients_speciality_porcentaje:any = [];
  public query_income_year:any = [];
  public notesRbts:any = [];
  public replacementeFiltrado:any = [];
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
    
    this.goal;
    // console.log(this.goal);
    

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
      // console.log(resp);
      this.client_selected = resp;// asignamos el objeto a nuestra variable
      this.patient_id = resp.patient.patient_id;  
      // console.log(this.patient_id);

      //traemos la info del usuario 
      if (this.client_selected.type !== null){// si hay o no informacion del paciente
        if (this.client_selected.eligibility == 'yes'){// si el status es positivo para proceder
          this.patient_id = this.client_selected.patient_id;  
        }
      }
      this.getGoalsReductions();
    });

  }

  // obtenemos todos las notas filtrandose con el nombre seleccionado traido como input.. this.goal 
  // junto con el patient_id por si existe otro paciente con el mismo maladaptive

  getGoalsReductions(){
    this.graphicReductionService.listReductionGraphics(this.goal, this.patient_id).subscribe((resp:any)=>{
     console.log(resp);
     this.notesRbts = resp.noteRbt.data; //obtiene una lista de notas con 3 json en cada una maladaptives, interventions y replacementes
      
     // en esta parte solo necesito el replacements: el nombre: goal y el numero: number_of_occurrences 

    //start
    //recorremos todas las listas para extraer los json
     this.replacements = this.notesRbts.filter(note => note.replacements).map(note => note.replacements);
     console.log(this.replacements);

     this.replacements 
     // recorre y extrae  el nombre de la meta que se quiere mostrar ?
      //end

    //   const reductions = [
    //     "[{\"goal\":\"probando Update\",\"total_trials\":23,\"number_of_correct_response\":23},{\"goal\":\"new\",\"total_trials\":34,\"number_of_correct_response\":54},{\"goal\":\"nuevo\",\"total_trials\":56,\"number_of_correct_response\":67},{\"goal\":\"dasads\",\"total_trials\":32,\"number_of_correct_response\":23},{\"goal\":\"prueba nueva\",\"total_trials\":34,\"number_of_correct_response\":21},{\"goal\":\"31\",\"total_trials\":14,\"number_of_correct_response\":34},{\"goal\":\"nuevo test\",\"total_trials\":43,\"number_of_correct_response\":43}]",
    //     "[{\"goal\":\"probando Update\",\"total_trials\":56,\"number_of_correct_response\":54},{\"goal\":\"new\",\"total_trials\":54,\"number_of_correct_response\":65},{\"goal\":\"nuevo\",\"total_trials\":15,\"number_of_correct_response\":45},{\"goal\":\"dasads\",\"total_trials\":34,\"number_of_correct_response\":45},{\"goal\":\"prueba nueva\",\"total_trials\":32,\"number_of_correct_response\":34},{\"goal\":\"31\",\"total_trials\":54,\"number_of_correct_response\":56},{\"goal\":\"nuevo test\",\"total_trials\":6,\"number_of_correct_response\":32}]",
    //     "[{\"goal\":\"probando Update\",\"total_trials\":56,\"number_of_correct_response\":54},{\"goal\":\"new\",\"total_trials\":54,\"number_of_correct_response\":65},{\"goal\":\"nuevo\",\"total_trials\":15,\"number_of_correct_response\":45},{\"goal\":\"dasads\",\"total_trials\":34,\"number_of_correct_response\":45},{\"goal\":\"prueba nueva\",\"total_trials\":32,\"number_of_correct_response\":34},{\"goal\":\"31\",\"total_trials\":54,\"number_of_correct_response\":56},{\"goal\":\"nuevo test\",\"total_trials\":6,\"number_of_correct_response\":32}]",
    //     "[{\"goal\":\"probando Update\",\"total_trials\":56,\"number_of_correct_response\":54},{\"goal\":\"new\",\"total_trials\":54,\"number_of_correct_response\":65},{\"goal\":\"nuevo\",\"total_trials\":15,\"number_of_correct_response\":45},{\"goal\":\"dasads\",\"total_trials\":34,\"number_of_correct_response\":45},{\"goal\":\"prueba nueva\",\"total_trials\":32,\"number_of_correct_response\":34},{\"goal\":\"31\",\"total_trials\":54,\"number_of_correct_response\":56},{\"goal\":\"nuevo test\",\"total_trials\":6,\"number_of_correct_response\":32}]",
    //     "[{\"goal\":\"probando Update\",\"total_trials\":56,\"number_of_correct_response\":54},{\"goal\":\"new\",\"total_trials\":54,\"number_of_correct_response\":65},{\"goal\":\"nuevo\",\"total_trials\":15,\"number_of_correct_response\":45},{\"goal\":\"dasads\",\"total_trials\":34,\"number_of_correct_response\":45},{\"goal\":\"prueba nueva\",\"total_trials\":32,\"number_of_correct_response\":34},{\"goal\":\"31\",\"total_trials\":54,\"number_of_correct_response\":56},{\"goal\":\"nuevo test\",\"total_trials\":6,\"number_of_correct_response\":32}]",
    //     "[{\"goal\":\"probando Update\",\"total_trials\":56,\"number_of_correct_response\":54},{\"goal\":\"new\",\"total_trials\":54,\"number_of_correct_response\":65},{\"goal\":\"nuevo\",\"total_trials\":15,\"number_of_correct_response\":45},{\"goal\":\"dasads\",\"total_trials\":34,\"number_of_correct_response\":45},{\"goal\":\"prueba nueva\",\"total_trials\":32,\"number_of_correct_response\":34},{\"goal\":\"31\",\"total_trials\":54,\"number_of_correct_response\":56},{\"goal\":\"nuevo test\",\"total_trials\":6,\"number_of_correct_response\":32}]"
    // ]

      const result1 = this.replacements.filter((number_of_correct_response) => number_of_correct_response.length > 90);

      console.log(result1);

    //start
    this.replacements = this.notesRbts.filter(note => note.replacements).map(note => note.replacements).flat();

      const extractedData = this.replacements
      .filter(replacement => replacement.replacements).map(replacement => ({
        goal: replacement.goal,
        number_of_occurrences: replacement.number_of_occurrences
      }));

      console.log(extractedData); //devuelve vacio
      //end

      //start
      let replacement_numbers: string[] = [] ;
      let array = this.notesRbts;
      for (this.replacement of array) {
        replacement_numbers.push(this.replacement.number_of_correct_response)
      //   if (this.replacement && this.replacement.goal) { // da error
      // }
      }
      console.log(replacement_numbers); 
      // devuele el total que tiene una nota
      //pero los devuelve con valor undefinned 
      //end

      //start
      this.replacementsExtractedGoal = this.replacements;
      for (var i = 0; i < this.replacementsExtractedGoal.length; i++) {
        console.log(this.replacementsExtractedGoal[i]); 
        // solo quita  el /, duplica el resultado y devuelve la todos los arrays
      }
      //end
      //start
      //  this.number_of_correct_response = this.replacements.filter(replacement => replacement.number_of_correct_response).map(replacement => replacement.number_of_correct_response);
      //  console.log(this.number_of_correct_response);
      //end
      
      
      //start
      // filtrar y obtener las fechas del array
      // aqui me funciona pero me trae la info en un array [1,2,3]
      this.sessionDates = this.notesRbts.filter(note => note.session_date).map(note => note.session_date); 
      console.log('fechas',this.sessionDates);
      //end
      
      
      //Chart
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
              show: true
             }
           },  
          yaxis: {
            lines: { 
              show: true 
             }
           },   
          },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          // curve: 'smooth',
        },
        series: [
          {
            name: 'Number of Occurrences',
            color: '#00D3C7',
            // data: this.replacements,
            data: [45, 60, 75, 51, 42, 42,45,],
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
