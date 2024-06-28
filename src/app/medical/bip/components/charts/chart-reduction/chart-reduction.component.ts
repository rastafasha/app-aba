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
  @Input() baseline_level:any;
  @Input() baseline_date:Date | 'shortTime';
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
  public created_at: any;
  public session_date: any = [];
  public maladaptives: any = [];
  public session_dates: any = [];
  public number_of_occurrences: number;
  public patient_selected: any = [];
  public client_selected: any = [];
  public sessionDates: any = [];
  
  public maladaptiveBehaviors: any = [];
  public maladaptivess: any = [];


  maladaptivesCol: any[];
  public sessions_dates: any = [];
  number_of_occurrence: any[];
  noteRbt: any[];
  dates: any[];


  public query_patient_by_genders:any = [];
  public query_patients_specialities:any = [];
  public query_patients_speciality_porcentaje:any = [];
  public query_income_year:any = [];
  public notesRbts:any = [];
  public graphData:any = [];
  public dataChartMaladative:any = [];
  
  respuestas: any = [{}];
  dataGrafico: any = [];
  public replacementsExtractedGoal: any = [] = [{}];
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
    
    this.maladaptive_behavior;
    this.initial_interesting;
    this.baseline_date;
    this.baseline_level;
    // console.log('baseline_level',this.baseline_level);
    // console.log('baseline_date',this.baseline_date);
    

    this.activatedRoute.params.subscribe((resp:any)=>{
      this.patient_id = resp.patient_id; // la respuesta se comienza a relacionar  en este momento con un cliente especifico
      // console.log(this.patient_id);
      this.getBip(); // se pide el perfil del paciente por el bip relacionado
      this.getProfileBip(); // se pide el perfil del paciente por el bip relacionado
     })
    //  this.getGraphicPatientMonth();
  }

// traemos la fecha inicial que viene de la creacion del bip
  getBip(){
    this.bipService.getBipByUser(this.patient_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.created_at = resp.bip.created_at;
      // console.log('creacion bip',this.created_at);
    });

  }

//traemos la info del paciente o cliente
  getProfileBip(){
    this.bipService.showBipProfile(this.patient_id).subscribe((resp:any)=>{
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
      setTimeout(() => {
        this.getGraphicMaladaptive();
      }, 50);
      
    });

  }

  // obtenemos todos las notas filtrandose con el nombre seleccionado traido como input.. this.maladaptive_behavior 
  // junto con el patient_id por si existe otro paciente con el mismo maladaptive

    getGraphicMaladaptive(){
    this.graphicReductionService.listMaladaptivesGraphics(this.maladaptive_behavior, this.patient_id).subscribe((resp:any)=>{
      
      // console.log(resp);
      
      //funcion de pablo alcorta
      //se limpia y se extrae los datos de la coleccion json 
      const data = resp;
      const maladaptivesParsed = [];
      data?.maladaptivesCol.forEach(maladaptive => {
        const maladaptiveParsed = parsearMaladaptivesCol(maladaptive, this.maladaptive_behavior);
        maladaptivesParsed.push(maladaptiveParsed);
      });
  
      // console.log(maladaptivesParsed);
      data.maladaptivesCol = maladaptivesParsed;
      // console.log(data)
      
      //lo convierto a variable
      this.graphData = maladaptivesParsed;
      // console.log(this.graphData);
      
      function parsearMaladaptivesCol(maladaptive, maladaptiveSelected) {
        const maladaptiveWithoutSlash = maladaptive.replace(/\\"/g, '"');
        const maladaptiveParsed = JSON.parse(maladaptiveWithoutSlash.slice(1, -1));

        return maladaptiveParsed.find(item => item?.maladaptive_behavior == maladaptiveSelected)
          
      }
      
      // fin funcion de pablo alcorta
      // recorremos el resultado del array maladaptivesParsed para extraer los solicitados por el request
      let number_of_occurrences: number[] = [] ;
      let maladaptive_behavior: string[] = [] ;
      let array = this.graphData;
      for (this.maladaptives of array) {
        number_of_occurrences.push(Number(this.maladaptives.number_of_occurrences))
        maladaptive_behavior.push(String(this.maladaptives.maladaptive_behavior))
      }
      // console.log(number_of_occurrences);
      // console.log(maladaptive_behavior);

      
      // traemos todas las fechas
      this.sessions_dates = resp.sessions_dates.session_date;
      this.number_of_occurrence = number_of_occurrences;
      this.notesRbts = resp.noteRbt;
 
      //fechas junto con la baseline del maladaptive
      this.sessions_dates = [];
      // recorremos la respuesta para traer todos
      resp.sessions_dates.forEach((element) => {
        this.sessions_dates.push(element.session_date)
      });
      this.sessions_dates.unshift(this.baseline_date); // con unshift lo unimos y colocamos de primero
      this.number_of_occurrence.unshift(this.baseline_level); // con unshift lo unimos y colocamos de primero
      // console.log(this.sessions_dates);
      // console.log(this.number_of_occurrence);
      // console.log(resp)

      if(
        this.sessions_dates?.length > 1 && 
        this.sessions_dates?.length === this.number_of_occurrence?.length
      ) {
        let acumulador = 0;
        const acumuladorDeSemanas = [];
        let cantidadDeDias = 0;
        let labelSemanal = '';
        const arrayLabelSemanal = [];
        resp.sessions_dates.forEach((sessions_date,index) => {
          if(index > 0) {
            if (cantidadDeDias == 0) {
              // labelSemanal = sessions_date.substr(0,10);
              labelSemanal = sessions_date.session_date.toString().substr(0,10);
            }
            acumulador = acumulador+this.number_of_occurrence[index];
            cantidadDeDias += 1;

            if (cantidadDeDias == 7 || index+1 == resp.sessions_dates.length) {
              // labelSemanal += ' - '+sessions_date.substr(0,10);
              labelSemanal += ' - '+sessions_date.session_date.toString().substr(0,10);
              acumuladorDeSemanas.push(acumulador);
              arrayLabelSemanal.push(labelSemanal);
              cantidadDeDias = 0;
              acumulador = 0;
              labelSemanal = '';
            }
          }
        });
        this.sessions_dates = [this.baseline_date.toString().substr(0,10)].concat(arrayLabelSemanal);
        this.number_of_occurrence = [this.number_of_occurrence[0]].concat(acumuladorDeSemanas);
      }
 
      
       
       // data filtrada para el grafico
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
             name: 'Number of Occurrences',
             color: '#00D3C7',
            //  data: [32, 30, 56, 56, 56, 42, 30, 42, 30],
             data: this.number_of_occurrence
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




// // Sum the 'number_of_occurrences' values in the array
// const sumOfOccurrences = arrayOfObjects.reduce((accumulator, currentValue) => {
//   return isNumeric(currentValue.number_of_occurrences)? accumulator + currentValue.number_of_occurrences : accumulator;
// }, 0);





  extractData(){
    // recorrer el array de billing_general para extraer la data
    let hours_group: string[] = [] ;
    let units_group: string[] = [] ;
      const extractedData = this.maladaptives

      let array = this.maladaptives;
      for (this.maladaptives of array) {
        hours_group.push(this.maladaptives.total_hours)
        units_group.push(this.maladaptives.total_units)
      //   if (this.replacement && this.replacement.goal) { // da error
      // }
      }
      // console.log(hours_group);
      // console.log(units_group);
      // // obtenemos el total de las horas en un rango de 7 dias  atras
      // var suma=0;
      // for (var i = hours_group.length - 1; i >= Math.max(0, hours_group.length - 7) ; i--) {
      //     suma += parseInt(hours_group[i], 10) || 0;  
      // }
      // // this.week_total_hours = suma / Math.min(7, hours_group.length);// saca el promedio
      // this.week_total_hours = suma ; // saca la suma
      // console.log("promedio semanal "+ this.week_total_hours );

      // // obtenemos el total de las unidades en un rango de 7 dias  atras
      // var sumaunit=0;
      // for (var i = units_group.length - 1; i >= Math.max(0, units_group.length - 7) ; i--) {
      //     sumaunit += parseInt(units_group[i], 10) || 0;  
      // }
      // // this.week_total_units = sumaunit / Math.min(7, units_group.length);// saca el promedio
      // this.week_total_units = sumaunit ; // saca la suma
      // console.log("promedio semanal "+ this.week_total_units );
  

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
  // selectedMonth(){
  //   // console.log(this.selectedValue);
  //   this.getGraphicPatientMonth();
  // }
    
  
}
