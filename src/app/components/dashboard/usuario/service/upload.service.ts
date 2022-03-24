import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable, observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UploadService{

    private urlUpLoadService ='http://localhost:44316/api/House/UploadFile';

    constructor (private _http:HttpClient){}

    uploadImage(vals:any): Observable<any>{
        let data= vals;
        return this._http.post(this.urlUpLoadService,data)
    }

    private urluploadExcel='http://192.168.100.10/api/House/excel';
    postUploadExcel(vals:any):Observable<any>{
      let data= vals;
      return this._http.post<any>(this.urluploadExcel,data);
    }



}