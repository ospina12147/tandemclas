import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { timeout, catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	private apiUrl: string = 'https://tandemclass.com';
  private apiKey: string = 'key_a80c9ae7ee184a934180183391da3b93'
  private apiSecret: string = 'secret_c94bd3ec7a7009f0d42c6ec9ab8c64aa374b8adf6cb14bdbae9313a44de7ff50'

  constructor(
    private http:HttpClient,
	private tools:ToolsService
  ) {
    
  }

  get(endpoint: string) {
		return new Promise((resolve, reject) => {
			Preferences.get({key:'stg-user'}).then((user:any) => {
				user = JSON.parse(user.value);
				const token = (user) ? user.token : '';
				this.http.get(`${this.apiUrl}/${endpoint}`, {
					headers: { Authorization: 'Basic ' + btoa(`${this.apiKey}:${this.apiSecret}`) }
				}).pipe(
					retry(0)
				)
				.toPromise()
					.then(resp => {
						resolve(resp)
					})
					.catch(err => {
						reject(err)
					});
			});
		});
	}

	getBearer(endpoint: string) {
		return new Promise((resolve, reject) => {
			Preferences.get({key:'stg-user'}).then((user:any) => {
				Preferences.get({ key: 'tokenUser' }).then((tokenU: any) => {
					console.log("api service");
					user = JSON.parse(user.value);
					tokenU = JSON.parse(tokenU.value);
					console.log(tokenU);
					const token = (tokenU) ? tokenU : '';
					console.log('Bearer ' + token);
					this.http.get(`${this.apiUrl}/${endpoint}`, {
						headers: { Authorization: 'Bearer ' + token }
					}).pipe(
						retry(0)
					)
					.toPromise()
						.then(resp => {
							resolve(resp)
						})
						.catch(err => {
							reject(err)
						});
					});
			});
		});
	}

	getSpeedTest(endpoint: string) {
		return new Promise((resolve, reject) => {
			Preferences.get({key:'stg-user'}).then((user:any) => {
				user = JSON.parse(user.value);
				const token = (user) ? user.token : '';
				this.http.get(`${this.apiUrl}/${endpoint}`, {
					headers: { Authorization: 'Bearer ' + btoa(`${this.apiKey}:${this.apiSecret}`)  }
				}).pipe(
					timeout(4000),
					catchError(e => {
					  return of(e);
					})
				  ).toPromise()
					.then(resp => {
						resolve(resp)
					})
					.catch(err => {
						reject(err)
					});
			});
		});
	}
	
	post(endpoint: string, data: any) {
		return new Promise((resolve, reject) => {
			Preferences.get({key:'stg-user'}).then(async (user:any) => {
				user = JSON.parse(user.value);
				const token = (user) ? user.token : '';
				return await this.http
					.post(`${this.apiUrl}/${endpoint}`, data, {
						headers: { Authorization: 'Basic ' + btoa(`${this.apiKey}:${this.apiSecret}`)  }
					})
					.pipe(
						retry(0)
					)
					.toPromise()
					.then(resp => resolve(resp))
					.catch(err => {
						reject(err)
					});
			});
		});
	}

	postBearer(endpoint: string, data: any) {
		return new Promise((resolve, reject) => {
			Preferences.get({key:'stg-user'}).then((user:any) => {
				Preferences.get({ key: 'tokenUser' }).then((tokenU: any) => {
					console.log("api service");
					user = JSON.parse(user.value);
					tokenU = JSON.parse(tokenU.value);
					console.log(tokenU);
					const token = (tokenU) ? tokenU : '';
					console.log('Bearer ' + token);
					this.http.post(`${this.apiUrl}/${endpoint}`, data, {
						headers: { Authorization: 'Bearer ' + token }
					}).pipe(
						retry(0)
					)
					.toPromise()
						.then(resp => {
							resolve(resp)
						})
						.catch(err => {
							reject(err)
						});
					});
			});
		});
	}

	put(endpoint: string, data: any) {
		return new Promise((resolve, reject) => {
			Preferences.get({key:'stg-user'}).then(async (user:any) => {
				user = JSON.parse(user.value);
				const token = (user) ? user.token : '';
				return await this.http
					.put(`${this.apiUrl}/${endpoint}`, data, {
						headers: { Authorization: 'Basic ' + btoa(`${this.apiKey}:${this.apiSecret}`)  }
					})
					.pipe(
						retry(0)
					)
					.toPromise()
					.then(resp => resolve(resp))
					.catch(err => {
						reject(err)
					});
			});
		});
	}

	delete(endpoint: string) {
		return new Promise((resolve, reject) => {
			Preferences.get({key:'stg-user'}).then(async (user:any) => {
				user = JSON.parse(user.value);
				const token = (user) ? user.token : '';
				return await this.http
					.delete(`${this.apiUrl}/${endpoint}`,{
						headers: { Authorization: 'Basic ' + btoa(`${this.apiKey}:${this.apiSecret}`)  }
					})
					.pipe(
						retry(0)
					)
					.toPromise()
					.then(resp => resolve(resp))
					.catch(err => {
						reject(err)
					});
			});
		});
	}

	uploadImagesVentas(image:any, idVenta:any, idEvidencia:any, name:any) {
		const blobData = this.b64toBlob(image.base64,image.format); 
		const formData = new FormData();
		formData.append('file', blobData, name);
		formData.append('file64', image.base64);
		formData.append('path', image.path);
		formData.append('id_credito', idVenta);
		formData.append('id_evidencia', idEvidencia);

		console.log(formData)
		return this.post('test-upload',formData);
	}

	uploadImagesGastos(image:any, id_gasto:any, idEvidencia:any, name:any) {
		const blobData = this.b64toBlob(image.base64,image.format); 
		const formData = new FormData();
		formData.append('file', blobData, name);
		formData.append('file64', image.base64);
		formData.append('path', image.path);
		formData.append('id_evidencia', idEvidencia);
		formData.append('id_gasto', id_gasto);

		console.log(formData)
		return this.post('upload-evidencia-gasto-retiro',formData);
	}

	b64toBlob(b64Data:any, contentType = '', sliceSize = 512) {
		const byteCharacters = atob(b64Data);
		const byteArrays = [];
	
		for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		  const slice = byteCharacters.slice(offset, offset + sliceSize);
	
		  const byteNumbers = new Array(slice.length);
		  for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		  }
	
		  const byteArray = new Uint8Array(byteNumbers);
		  byteArrays.push(byteArray);
		}
	
		const blob = new Blob(byteArrays, { type: contentType });
		return blob;
	  }
}

