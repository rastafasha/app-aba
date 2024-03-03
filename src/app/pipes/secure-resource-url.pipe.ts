import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'secureResourceUrl'
})
export class SecureResourceUrlPipe implements PipeTransform {

  constructor(private readonly http: HttpClient, private readonly sanitizer: DomSanitizer) {}

    transform(url: string): Observable<SafeResourceUrl> {
        let headers = new HttpHeaders();
        headers = headers.set('Accept', 'application/pdf');

        return this.http
            .get(this.sanitizer.sanitize(SecurityContext.URL, url), { headers: headers, responseType: 'blob' })
            .pipe(map((val) => this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(val))));
    }

}
