import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor() { }

  getData(): any {
    const gh = ajax.getJSON('https://datos.gob.es/apidata/catalog/distribution');

    const data = new Observable(observer => {
      gh.subscribe(
        (res) => {
          observer.next(res);
          observer.complete();
        },
        (err) => {
          observer.error(err);
        }
      );
    });

    return data;
  }

}
