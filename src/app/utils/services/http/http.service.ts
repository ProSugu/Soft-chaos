import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { 
  }

  /****************** Request ********************/
  getData(url: string, params: { [x: string]: any }, path?: { [x: string]: any }): Observable<any> {
    const finalParams = params ? { params: this.appendParams(params) } : {};
    const newPath = path ? this.createPath(url, path) : '';
    return this.http.get<HttpClient>(path ? environment.BASE_PATH + newPath : environment.BASE_PATH + url, finalParams);
  }

  postData(url: string, params: { [x: string]: any }, path?: { [x: string]: any }, formData?: boolean): Observable<any> {
   const newPath = path ? this.createPath(url, path) : '';
   const finalParams = formData ? this.appendFormData(params) : params;
   return this.http.post<HttpClient>(path ? environment.BASE_PATH + newPath : environment.BASE_PATH + url, finalParams);
  }

  putData(url: string, params: { [x: string]: any; }, path?: { [x: string]: any }): Observable<any> {
    const finalParams = params ? params : this.appendParams(params);
    const newPath = path ? this.createPath(url, path) : '';
    return this.http.put<HttpClient>(path ? environment.BASE_PATH + newPath : environment.BASE_PATH + url, finalParams);
  }

  patchData(url: string, params: { [x: string]: any }, path?: { [x: string]: any }): Observable<any> {
    const newPath = path ? this.createPath(url, path) : '';
    return this.http.patch<HttpClient>(path ? environment.BASE_PATH + newPath : environment.BASE_PATH + url, params);
  }

  deteteData(url: string, id: string, path?: { [x: string]: any }) {
    const newPath = path ? this.createPath(url, path) : '';
    const finalPath = (path ? environment.BASE_PATH + newPath : environment.BASE_PATH + url);
    const finalUrl = id ? finalPath + '/' + id : finalPath;
    return this.http.delete<HttpClient>(finalUrl);
  }

  /************** Params ****************/
  appendParams(myParams: { [X: string]: any; }): HttpParams {
    let params = new HttpParams();
    for (const key in myParams) {
      if (myParams.hasOwnProperty(key)) {
        params = params.append(key, myParams[key]);
      }
    }
    return params;
  }

  /************ FormData**************/
  appendFormData(myFormData: { [X: string]: any; }): FormData {
    const formData = new FormData();
    for (const key in myFormData) {
      if (myFormData.hasOwnProperty(key)) {
        formData.append(key, myFormData[key]);
      }
    }
    return formData;
  }

  /*****************Crete url with dynamic Id's ********/
  createPath(url, path: { [x: string]: any }) {
    let newPath = url;
    for (const key in path) {
      if (path.hasOwnProperty(key)) {
        newPath = (newPath.replace(key, path[key]))
      }
    }
    return newPath;
  }

}
