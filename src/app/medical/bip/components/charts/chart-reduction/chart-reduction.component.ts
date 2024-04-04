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
  public maladaptivess: any = [];


  maladaptivesCol: any[];
  sessions_dates: any[];
  noteRbt: any[];


  public query_patient_by_genders:any = [];
  public query_patients_specialities:any = [];
  public query_patients_speciality_porcentaje:any = [];
  public query_income_year:any = [];
  public notesRbts:any = [];
  public dataChartMaladative:any = [];
  
  respuestas: any = [{}];
  dataGrafico: any = [];
  
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
     this.getBip(); // se pide el perfil del paciente por el bip relacionado
     this.getProfileBip(); // se pide el perfil del paciente por el bip relacionado
    //  this.getGraphicPatientMonth();
  }

// traemos la fecha inicial que viene de la creacion del bip
  getBip(){
    this.bipService.getBipByUser(this.client_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.created_at = resp.bip.created_at;
      console.log(this.created_at);
    });

  }

//traemos la info del paciente o cliente
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
      setTimeout(() => {
        this.getGraphicMaladaptive();
      }, 50);
      
    });

  }

  // obtenemos todos las notas filtrandose con el nombre seleccionado traido como input.. this.maladaptive_behavior 
  // junto con el patient_id por si existe otro paciente con el mismo maladaptive

    getGraphicMaladaptive(){
    this.graphicReductionService.listMaladaptivesGraphics(this.maladaptive_behavior, this.patient_id).subscribe((resp:any)=>{
      //la respuesta que me da  tiene un array de objets,
      console.log(resp);
     

      // recibo la data asi
      //[
      //     "\"[{\\\"maladaptive_behavior\\\":\\\"Negative Self talk\\\",\\\"number_of_occurrences\\\":3},{\\\"maladaptive_behavior\\\":\\\"dasdsa\\\",\\\"number_of_occurrences\\\":3}]\"",
       //     "\"[{\\\"maladaptive_behavior\\\":\\\"Negative Self talk\\\",\\\"number_of_occurrences\\\":3},{\\\"maladaptive_behavior\\\":\\\"dasdsa\\\",\\\"number_of_occurrences\\\":4}]\""
      // ]
      //quiero eliminar cada \ incluyendo el  "\"

      //convertimos la data a string para poder eliminar lo sobrante
      this.maladaptives = resp.maladaptivesCol.toString();
  
      // Remove the first and last characters of the string
      let cleanJsonString = this.maladaptives.slice(1, -1);

      
      //limpia todo pero deja 1
      // [{\"maladaptive_behavior\":\"Negative Self talk\",\"number_of_occurrences\":3},
      // [{\"maladaptive_behavior\":\"Negative Self talk\",\"number_of_occurrences\":3},
      //{\"maladaptive_behavior\":\"dasdsa\",\"number_of_occurrences\":3}]",
      //"[{\"maladaptive_behavior\":\"Negative Self talk\",\"number_of_occurrences\":5},{\"maladaptive_behavior\":\"dasdsa\",\"number_of_occurrences\":4}]","[{\"maladaptive_behavior\":\"Negative Self talk\",\"number_of_occurrences\":3},{\"maladaptive_behavior\":\"dasdsa\",\"number_of_occurrences\":2}]","[{\"maladaptive_behavior\":\"Negative Self talk\",\"number_of_occurrences\":4},{\"maladaptive_behavior\":\"dasdsa\",\"number_of_occurrences\":2}]","[{\"maladaptive_behavior\":\"Negative Self talk\",\"number_of_occurrences\":4},{\"maladaptive_behavior\":\"dasdsa\",\"number_of_occurrences\":4}]","[{\"maladaptive_behavior\":\"Negative Self talk\",\"number_of_occurrences\":3},{\"maladaptive_behavior\":\"dasdsa\",\"number_of_occurrences\":3}]","[{\"maladaptive_behavior\":\"Negative Self talk\",\"number_of_occurrences\":5},{\"maladaptive_behavior\":\"dasdsa\",\"number_of_occurrences\":5}]","[{\"maladaptive_behavior\":\"Negative Self talk\",\"number_of_occurrences\":5},{\"maladaptive_behavior\":\"dasdsa\",\"number_of_occurrences\":4}]","[{\"maladaptive_behavior\":\"Negative Self talk\",\"number_of_occurrences\":3},{\"maladaptive_behavior\":\"dasdsa\",\"number_of_occurrences\":4}]
      
      
      
      //necesito lipiar todos los \ que habian salido en la cadena json
      const regex = /\\/g;
      cleanJsonString= cleanJsonString.replace(regex, "");
      // console.log(cleanJsonString); // aqui quita el "\" que me pone antes y despues de todo
      
      // hasta aqui ya obtengo lo que quiero, la lista completa sin basura
      // lo igualamos a una variable para poder trabajarala en el  html
      // this.respuestas = JSON.parse(cleanJsonString ) ;
      //error, no reconoce como array

     
      this.respuestas = cleanJsonString;
      console.log(this.respuestas);
       //aqui ya recibo la data limpia pero en string...
      //tengo que convertirla a un arreglo de objetos
      // aqui los recibo asi"
      // [{"maladaptive_behavior":"Negative Self talk","number_of_occurrences":3},{"maladaptive_behavior":"dasdsa","number_of_occurrences":3}]","[{"maladaptive_behavior":"Negative Self talk","number_of_occurrences":5},{"maladaptive_behavior":"dasdsa","number_of_occurrences":4}]","[{"maladaptive_behavior":"Negative Self talk","number_of_occurrences":3},{"maladaptive_behavior":"dasdsa","number_of_occurrences":2}]","[{"maladaptive_behavior":"Negative Self talk","number_of_occurrences":4},{"maladaptive_behavior":"dasdsa","number_of_occurrences":2}]","[{"maladaptive_behavior":"Negative Self talk","number_of_occurrences":4},{"maladaptive_behavior":"dasdsa","number_of_occurrences":4}]","[{"maladaptive_behavior":"Negative Self talk","number_of_occurrences":3},{"maladaptive_behavior":"dasdsa","number_of_occurrences":3}]","[{"maladaptive_behavior":"Negative Self talk","number_of_occurrences":5},{"maladaptive_behavior":"dasdsa","number_of_occurrences":5}]","[{"maladaptive_behavior":"Negative Self talk","number_of_occurrences":5},{"maladaptive_behavior":"dasdsa","number_of_occurrences":4}]","[{"maladaptive_behavior":"Negative Self talk","number_of_occurrences":3},{"maladaptive_behavior":"dasdsa","number_of_occurrences":4}]
      
      //debo volver a convertir en string para continuar y sacar los demas datos
      // this.respuestas = JSON.parse(cleanJsonString) ;

      //resultado: error
      // error Unexpected non-whitespace character after JSON at position 133 (line 1 column 134)
  
      // console.log(this.respuestas);

      // v2
      //recibo la respuesta como un string y ahora debo convertirla de nuevo a un array
      // para poder recorrer y estraer la data
      
      // const jsonData = this.respuestas;
      // const parsedData = JSON.parse(jsonData);
      // console.log(parsedData);

      //devuelve el siguiente error:
      // error Unexpected non-whitespace character after JSON at position 133 (line 1 column 134)

      //v3
      //debo volver a convertirlo a en un array con que pueda trabajar
      // this.dataGrafico = JSON.parse("[" + this.respuestas + "]") ;
      //error con el JSON.parse , falta algo entre las comillas
      // console.log(this.dataGrafico) ;//no funciona
      //SyntaxError: Expected ',' or ']' after array element in JSON at position 134 (line 1 column 135)
      
      
      //v4
      var arr = "[{}]";
      this.respuestas = JSON.parse(arr.replace(/}{/, "},{")) ;
      console.log(this.respuestas); 
      // se convierte en array pero lo devuelve vacio
      
      
      // aqui intento agregarle el indice, funciona pero devuelve vacio el contenido
      // const arrayOfObjects = this.respuestas;
      // // Assuming arrayOfObjects is the variable you want to check
      // if (!Array.isArray(arrayOfObjects)) {
      //   console.error('arrayOfObjects is not an array');
      // } else {
      //   // Add an index to each object in the array
      //   const indexedArray = arrayOfObjects.map((obj, index) => {
      //     return {...obj, index };
      //   });

      //   console.log('Indexed array:', indexedArray);
      // }
       
      // v5
      // // Parse the JSON string into a JavaScript object
      // const parsedJson = JSON.parse(cleanJsonString);
      
      // // Extract the array of values from the object
      // const arrayOfValues = Object.values(parsedJson);
      
      // console.log('Array of values:', arrayOfValues);
      // console.log(this.respuestas); 
      
      
      // v6
      // Parse the modified string into an array of JSON objects
      // let cleanJson = cleanJsonString.split('","');
      // console.log(cleanJson); // aqui vuelve a colocar la basura
      
      // Initialize an array to store the parsed JavaScript objects
      
      //   let cleanString = cleanJsonString.substring().split('","').map((obj) => {
        //     return JSON.parse(obj.replace(/^"|"$/g,''));
        // });
        
        //   // Iterate through the array and parse each JSON object into a JavaScript object
        //   let myObjects = [];
    //   for (let i=0; i<cleanJson.length; i++){
    //     let myObject = JSON.parse(cleanJson[i].replace(/^"|"$/g, ''));
    //     myObjects.push(myObject);
    //   }
      
      // console.log(cleanString);
      // console.log(myObjects);
       
 
      
      // traemos todas las fechas
      this.sessions_dates = resp.sessions_dates;
      this.notesRbts = resp.noteRbt;
 
      //fecha inicial cuando se hizo el bip
      this.sessions_dates.unshift(this.created_at); // con unshift lo unimos y colocamos de primero
      // console.log(this.sessions_dates);
 
     //  //console.log("Estoy dentro de chartData");
     //  for (let i = 1; i < this.sessionDates.length; i++) {
     //    var dateA = new Date(this.sessionDates[i-1]);
     //    var dateB = new Date(this.sessionDates[i]);
     //    var timeDiff = Math.abs((dateB - dateA)/1000); //in seconds
     //    // calculate days, hours, minutes and seconds
     //    var days = Math.floor(timeDiff/86400);
     //    var hrs = Math.floor((timeDiff%86400)/3600);
        
     //    if (isNaN(days)) {  
     //      this.chartData.push([null]);
     //    } else{
     //      this.chartData.push([days+ "d", parseFloat((hrs/(24*days)).toFixed(2)) ]);
     //    };
      
       
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
             data: [32, 30, 56, 56, 56, 42, 30, 42, 30],
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
      console.log(hours_group);
      console.log(units_group);
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
