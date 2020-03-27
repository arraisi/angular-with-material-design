import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Http } from '@angular/http';

@Injectable()
export class SolutionListService {

  constructor(
    private http: HttpClient
  ) { }

  public findAll() {
    // console.log(`${environment.uriApi}/books/`);
    return this.http.get(`${environment.uriApi}/books/`, {observe: 'response'});
  }
}
