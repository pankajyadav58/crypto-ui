import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {TransactionService} from './../transaction.service';


@Component({
  selector: 'detail-tx',
  templateUrl: './detailTx.html',
  styleUrls: ['./detailTx.scss'],
  providers: []
})
export class DetailTx implements OnInit, OnDestroy{

  transactionInfo:any;
  private hash:any;
  private sub: any;

  constructor(public router:Router, private activatedRoute: ActivatedRoute, private service: TransactionService) {

  }
  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
       this.hash = params['hash']; 
    });
    this.get();
  }

  get(){
    this.service.get(this.hash).subscribe(
      response => {
        this.transactionInfo = response;
      },
      error => {
        console.log(error, 'error');
      }
  )
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  
}
