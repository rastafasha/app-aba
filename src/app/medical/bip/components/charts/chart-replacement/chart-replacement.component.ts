import { Component, OnInit, ViewChild } from '@angular/core';
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
  public selectedValue: string ='2024';
  @ViewChild('chart') chart!: ChartComponent;

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
  public appointment_pendings:any = [];

  public num_appointments_current: number = 0;
  public num_appointments_before: number = 0;
  public porcentaje_d: number = 0;

  public num_patients_current:number = 0;
  public num_patients_before:number = 0;
  public porcentaje_dp:number = 0;

  public num_appointments_attention_current:number = 0;
  public num_appointments_attention_before:number = 0;
  public porcentaje_da:number = 0;

  public num_appointments_total_current: number = 0;
  public num_appointments_total_before: number = 0;
  public porcentaje_dt: number = 0;

  public query_patient_by_genders:any = [];
  public query_patients_specialities:any = [];
  public query_patients_speciality_porcentaje:any = [];
  public query_income_year:any = [];
  public user: any;
  //datos reales

  constructor(
    private data: DataService,
    public activatedRoute: ActivatedRoute,
    public doctorService: DoctorService,
    public dashboardService : DashboardService,
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
    //       name: 'Health',
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
          data:[] //[45, 60, 75, 51, 42, 42, 30],
        },
      ],
      xaxis: {
        categories: []//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
    };
  }


  getDashboardAdminYear(){
    let data ={
      year: this.selectedValue,
    }
    this.query_income_year = null;
    this.dashboardService.dashboardAdminYear(data).subscribe((resp:any)=>{
      // console.log(resp);
      //start
      this.query_patient_by_genders = resp.query_patients_by_gender;
      
      let data_male:any = [];
      let data_female:any = [];
      this.query_patient_by_genders.forEach((item:any) => {
        data_male.push(item.hombre);
        data_female.push(item.mujer);
      });

      let Patient_by_Genders =[
        {
          name: 'Male',
          color: '#2E37A4',
          data: data_male,
        },
        {
          name: 'Female',
          color: '#00D3C7',
          data: data_female,
        },
      ];
      this.chartOptionsOne.series = Patient_by_Genders;
      //end

      //start
      this.query_patients_specialities = resp.query_patients_speciality;

      let labels_sp:any = [];
      let series_sp:any = [];
      this.query_patients_specialities.forEach((patients_speciality:any)=>{
        labels_sp.push(patients_speciality.name)
        series_sp.push(patients_speciality.count)
      })
      this.chartOptionsOne.labels = labels_sp;
      //end
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
      
      // this.chartOptionsThree.xaxis.categories = resp.months_name
      // this.chartOptionsThree.series = [
      //   {
      //     name: 'Income',
      //     color: '#2E37A4',
      //     data: data_income,
      //   },
      // ]
      //end
    })
  }
  selectedYear(){
    // console.log(this.selectedValue);
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
