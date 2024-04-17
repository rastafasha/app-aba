import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'transformToDate'
})
export class TransformToDatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return moment(value,'HHmmss').format("HH:mm A");
  }

  // si una hora es 60  minutos 
  // 2,75 deberia ser 3,15

  // si 1:45:00 son 14500

  // crear un trasformador de  fechas que reciba una cadena en el formato "HH:mm:ss" y lo convierta a milisegundos
   transformTimeToSeconds(time: string) {
    const [hours = '0', minutes = '0', seconds = '0'] = time.split(':');    
    let totalHours = parseInt(hours, 10);
    if (isNaN(totalHours)) { totalHours = 0; }
    const totalMinutes = parseInt(minutes, 10) + totalHours * 60;
    return totalMinutes * 60 + parseInt(seconds, 10);
  }
  
  /**
   * Convierte un tiempo en formato HH:MM:SS a formato DD/MM/YYYY hh:mm:ss AM/PM
   */
  public transformHHMMSSToDateTime(time: string, date?: Date | undefined) {
    if (!date) { date = new Date(); }
    const hoursInDecimal = this.transformTimeToSeconds(time) / (60 * 60);
    const hours = Math.floor(hoursInDecimal);
    const minutes = Math.floor((hoursInDecimal - hours) * 60);
    const isPm = hours >  12;
    const strHour = String(isPm ? hours - 12 : hours).padStart(2, '0');
    const strMinute = String(minutes).padStart(2, '0');
    const strSecond = String(Math.round((hoursInDecimal - Math.floor(hoursInDecimal)) * 60)).padStart(2, '0');
  }

}
