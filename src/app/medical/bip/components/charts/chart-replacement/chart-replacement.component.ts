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
  @Input() baseline_d:string;
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
  public graphData:any = [];
  public goals: any = [];
  sessions_dates: any[];
  number_of_occurrence: any[];
  // este es la porcentage_diario  de <h4> {{(replacemen.number_of_correct_response * 100 / replacemen.total_trials)}}%</h4>
  // debo guardarlo desde la nota rbt como sumatoria_porcentage_diario: este se suma la semana y se divide entre 7 o dias de la semana
  porcentage_diario = null;
  sumatoria_porcentage_diario: any[];
  promedio_porcentual_semanal: any[];
  
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
    this.baseline_d;
    // this.initial_interesting;
    // console.log('baseline_date',this.baseline_d);
    // console.log(this.goal);
    

    this.activatedRoute.params.subscribe((resp:any)=>{
      this.patient_id = resp.patient_id; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
    
     })
     this.getProfileBip(); // se pide el perfil del paciente por el bip relacionado
     this.getBip(); // se pide el perfil del paciente por el bip relacionado
    //  this.getGraphicPatientMonth();
  }

  getBip(){
    this.bipService.getBipByUser(this.patient_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.created_at = resp.bip.created_at;
      // console.log(this.created_at);
    });

  }

  getProfileBip(){
    this.bipService.showBipProfile(this.patient_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.client_selected = resp;// asignamos el objeto a nuestra variable
      // this.patient_id = resp.patient.patient_id;  
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
    
     //funcion de pablo alcorta
      //se limpia y se extrae los datos de la coleccion json 
      const data = resp;
      const replacementsParsed = [];
      data?.replacementsCol.forEach(goal => {
        const replacementParsed = parsearGoalsCol(goal, this.goal);
        replacementsParsed.push(replacementParsed);
      });
  
      // console.log(maladaptivesParsed);
      data.replacementsCol = replacementsParsed;
      // console.log(data)
      
      //lo convierto a variable
      this.graphData = replacementsParsed;
      // console.log(this.graphData);
      
      function parsearGoalsCol(goal, goalSelected) {
        const replacementWithoutSlash = goal.replace(/\\"/g, '"');
        const replacementParsed = JSON.parse(replacementWithoutSlash.slice(1,-1));
        // return JSON.parse(goalParsed);
        const index = replacementParsed.findIndex(item => item.goal === goalSelected)
        return (replacementParsed[index]);
      }
      // fin funcion de pablo alcorta
      // recorremos el resultado del array goalsParsed para extraer los solicitados por el request
      let number_of_correct_response: number[] = [] ;
      let goal: string[] = [] ;
      let array = this.graphData;
      for (this.goals of array) {
        number_of_correct_response.push(Number(this.goals.number_of_correct_response))
        goal.push(String(this.goals.goal))
      }
      const number_of_trials:number[] = [];
      array.forEach(element => {
        number_of_trials.push(element.total_trials)
      });
      // console.log(number_of_correct_response);
      // console.log(goal);





      //start
      this.replacementsExtractedGoal = this.replacements;
      // for (var i = 0; i < this.replacementsExtractedGoal.length; i++) {
        // console.log(this.replacementsExtractedGoal[i]); 
        // solo quita  el /, duplica el resultado y devuelve la todos los arrays
      // }
      //end
      //start
      //  this.number_of_correct_response = this.replacements.filter(replacement => replacement.number_of_correct_response).map(replacement => replacement.number_of_correct_response);
      //  console.log(this.number_of_correct_response);
      //end
      
      
      //start
      // traemos todas las fechas
      this.sessions_dates = resp.sessions_dates.session_date;
      this.number_of_correct_response = number_of_correct_response;
      this.notesRbts = resp.noteRbt;
 
      //fecha inicial cuando se hizo el bip
      this.sessions_dates = resp.sessions_dates.map(item => item.session_date);
      this.sessions_dates.unshift(this.created_at); // con unshift lo unimos y colocamos de primero
      // console.log(this.sessions_dates);
      // this.sessions_dates?.shift()
      this.number_of_correct_response.unshift(0)
      number_of_trials.unshift(0)
      //end

      if(
        this.sessions_dates?.length > 1 && 
        this.sessions_dates?.length === this.number_of_correct_response?.length
      ) {
        let acumulador = 0;
        let sumadorDeTrials = 0;
        const acumuladorDeSemanas = [];
        const acumuladorDeTrials = [];
        let cantidadDeDias = 0;
        let labelSemanal = '';
        const arrayLabelSemanal = [];
        this.sessions_dates.forEach((date,index) => {
          if(index > 0) {
            if (cantidadDeDias == 0) {
              labelSemanal = date.substr(0,10);
            }
            acumulador = acumulador+(+this.number_of_correct_response[index]);
            cantidadDeDias += 1;
            sumadorDeTrials += +number_of_trials[index];
            // console.log(sumadorDeTrials, index)

            if (cantidadDeDias == 7 || index+1 == this.sessions_dates.length) {
              labelSemanal += ' - '+date.substr(0,10);
              acumuladorDeSemanas.push(acumulador);
              arrayLabelSemanal.push(labelSemanal);
              cantidadDeDias = 0;
              acumulador = 0;
              labelSemanal = '';
              acumuladorDeTrials.push(sumadorDeTrials);
              sumadorDeTrials =0 ;
            }
          }
        });
        const porcentajes:number[] = [];
        if(acumuladorDeSemanas.length === acumuladorDeTrials.length) {
          acumuladorDeSemanas.forEach((ac,index) => {
            porcentajes.push(+(ac/acumuladorDeTrials[index]).toFixed(2)*100)
          })
        }
        
        this.sessions_dates = [this.sessions_dates[0].substr(0,10)].concat(arrayLabelSemanal);
        this.number_of_correct_response = [this.number_of_correct_response[0]].concat(porcentajes);
      }
      
      
      //Chart
      this.chartOptionsOne = {
        chart: {
          height: 370,
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
            name: '% Week',
            color: '#00D3C7',
            data: this.number_of_correct_response,
            // data: [45, 60, 75, 51, 42, 42,45,],
            // data: [this.initial_interesting, this.number_of_occurrences]
            
          },
        ],
        xaxis: {
          //
          categories:  this.sessions_dates,
          // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
      };
      
     
    },);

    

  }

  
  

  // getGraphicPatientMonth(){
  //   let data ={
  //     month: this.selectedValue,
  //   }
  //   this.graphicReductionService.graphicPatientMonth(data).subscribe((resp:any)=>{
  //     console.log(resp);
      

  //     //start
  //     this.query_income_year = resp.query_income_year;
  //     let data_income:any = [];
  //     this.query_income_year.forEach((element:any) => {
  //       data_income.push(element.income);
  //     });

  //     this.chartOptionsOne = {
  //       chart: {
  //         height: 200,
  //         type: 'line',
  //         toolbar: {
  //           show: false,
  //         },
  //       },
  //       grid: {
  //         show: true, 
  //         xaxis: {
  //           lines: {
  //             show: false
  //            }
  //          },  
  //         yaxis: {
  //           lines: { 
  //             show: true 
  //            }
  //          },   
  //         },
  //       dataLabels: {
  //         enabled: false,
  //       },
  //       stroke: {
  //         curve: 'smooth',
  //       },
  //       series: [
  //           {
  //             name: 'Income',
  //             color: '#2E37A4',
  //             data: data_income,
  //           },
  //         ],
  //       xaxis: {
  //         categories: resp.months_name,
  //       },
  //     };
      
  //     //end
  //   })
  // }
  // selectedMonth(){
  //   // console.log(this.selectedValue);
  //   // this.getGraphicPatientMonth();
  // }
    
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