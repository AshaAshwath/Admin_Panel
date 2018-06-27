import { Injectable } from '@angular/core';
import { DataService } from '../utils/shared-service/data.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
@Injectable()
export class MainService {

  constructor(private dataService: DataService) { }
  addProduct(query: any, obj: any): Observable<any> {
		return this.dataService.post(query, obj)
			.map(response => response)
			.catch(response => { return Observable.throw(response) });
	}
	addCategory(query: any, obj: any): Observable<any> {
		return this.dataService.post(query, obj)
		 .map(response => response)
		 .catch(response => { return Observable.throw(response) });
	 }
	uploadFile(url, data,) {
		return this
		  .dataService
		  .uploadFile(url, data)
		  .map((res: Response) => res)
		  .catch((error: any) => Observable.throw(error || 'Server error'));
	  }
	  uploadFileData(url, data,) {
		return this
		  .dataService
		  .uploadFileData(url, data)
		  .map((res: Response) => res)
		  .catch((error: any) => Observable.throw(error || 'Server error'));
	  }
	getData(url) {
		return this
			.dataService
			.get(url)
			.map((res: Response) => res)
			.catch((error: any) => Observable.throw(error || 'Server error'));
	}
}
