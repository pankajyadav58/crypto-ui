import {Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class TransactionService {

    constructor (private http: Http ) {}
    
      getBalance() {
        const headers = new Headers({'Access-Control-Allow-Origin': '*', 'Authorization': localStorage.getItem('access_token')}); // ... Set content type to JSON 
        const options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.get("http://localhost:8080/api/v1" + "/wallet/btc/address", options)
        .map((res:Response) => res.json());
      }
      send(payload:Object) {
        const headers = new Headers({'Access-Control-Allow-Origin': '*', 'Authorization': localStorage.getItem('access_token')}); // ... Set content type to JSON 
        const options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post("http://localhost:8080/api/v1" + "/wallet/btc/transactions", payload, options)
        .map((res:Response) => res.json());
      }

      get(txHash:any) {
        const headers = new Headers({'Access-Control-Allow-Origin': '*', 'Authorization': localStorage.getItem('access_token')}); // ... Set content type to JSON 
        const options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.get("http://localhost:8080/api/v1" + "/wallet/btc/transactions/" + txHash,  options)
        .map((res:Response) => res.json());
      }
}
