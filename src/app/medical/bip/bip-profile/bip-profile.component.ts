import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../../doctors/service/doctor.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { BipService } from '../service/bip.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bip-profile',
  templateUrl: './bip-profile.component.html',
  styleUrls: ['./bip-profile.component.scss']
})
export class BipProfileComponent {
  public routes = routes;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
  public patientProfile: any[];
  option_selected:number = 1;
  public patient_id: any;

  public num_appointment: number = 0;
  public money_of_appointments: number = 0;
  public num_appointment_pendings: number = 0;
  public appointment_pendings: any =[];
  public appointments: any =[];
  public pa_assessments: any =[];
  
  public bip_selected: any ={};
  public patient_selected: any ={};

  public text_success:string = '';
  public text_validation:string = '';

  imagenSerUrl = environment.url_media;

  constructor(
    public bipService : BipService,
    public activatedRoute: ActivatedRoute,
    public doctorService: DoctorService,
    )
  {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.doctorService.closeMenuSidebar();
    this.activatedRoute.params.subscribe((resp:any)=>{
      // console.log(resp);
      this.patient_id = resp.id;
    });
    this.getPatient();
  }

  getPatient(){
    this.bipService.getBipProfilePatient_id(this.patient_id).subscribe((resp:any)=>{
      console.log(resp);
      this.bip_selected= resp.bip;
      this.patient_selected= resp.patient;


    })
  }


  optionSelected(value:number){
    this.option_selected = value;
  }

  // public convertToPdf(): void {
  //   const data = this.contentToConvert.nativeElement;
  //   html2canvas(data).then(canvas => {
  //     // Few necessary setting options
  //     const imgWidth = 208;
  //     const pageHeight = 295;
  //     const imgHeight = canvas.height * imgWidth / canvas.width;
  //     const heightLeft = imgHeight;

  //     const margins = {
  //       top: 40,
  //       bottom: 60,
  //       left: 40,
  //       width: 522
  //     };

  //     // Create a new PDF document
  //     const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
  //     // const pdf = new jspdf.jsPDF('p', 'pt', 'letter');

  //     // Add an image of the canvas to the PDF
  //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

  //     // Save the PDF
  //     pdf.save('bip_'+this.patient_selected.patient_id+".pdf");
  //   });
  // }

  
 

public convertToPdf(): void {
  const data = this.contentToConvert.nativeElement;

    html2canvas(data).then(canvas => {
    // Few necessary setting options
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;

    // Create a new PDF document
    const pdf = new jspdf.jsPDF('p', 'mm');
    var position = 0;

    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save('bip_'+this.patient_selected.patient_id+".pdf");
    // pdf.save('note_rbt_client_'+this.patient_selected.patient_id+'_'+this.patient_selected.last_name+".pdf");
  });

    
}
}
