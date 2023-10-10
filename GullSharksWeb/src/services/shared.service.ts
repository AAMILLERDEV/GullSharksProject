import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import appConfig from 'src/assets/appConfig.json';

const PostRequestOptions = { headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  public baseURL: string = "";

  constructor(private http: HttpClient) {
    this.baseURL = appConfig['settingsURL'];
  }

  public get(endpoint: string): Promise<any> {
    return lastValueFrom(this.http.get<any | any[]>(this.baseURL + endpoint));
  }

  public upsert(endpoint: string, obj: any): any {
    return lastValueFrom(this.http.post<any | any[]>(this.baseURL + endpoint, obj, PostRequestOptions));
  }
}
