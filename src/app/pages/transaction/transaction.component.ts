import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SendComponent } from './popup/send.component';

@Component({
  selector: 'data-tables',
  templateUrl: './dataTables.html',
  styleUrls: ['./dataTables.scss']
})
export class TransactionComponent {
   private DecimalPont = 100000000;
    data;
    filterQuery = "";
    rowsOnPage = 10;
    sortBy = "email";
    sortOrder = "asc";
    walletInfo:any = {};
    total_send:any = 'Loading..';
    total_received:any = 'Loading..';
    balance:any = 'Loading..';
    final_balance:any = 'Loading..';
    btcAddress = localStorage.getItem("btcAddress");

    constructor(private service: TransactionService, private modalService: NgbModal) {
    this.service.getBalance().subscribe(
      response => {
        console.log(response);
        this.walletInfo = response;
        this.data = response.txs;
        if(response['balance'] && response['balance'] > 0){
          this.balance = response['balance']/this.DecimalPont;
        } else {
          this.balance = '0.00';
        }
        if(response['total_sent'] && response['total_sent'] > 0){
          this.total_send = response['total_sent']/this.DecimalPont;
        } else {
          this.total_send = '0.00';
        }
        if(response['total_received'] && response['total_received'] > 0){
          this.total_received = response['total_received']/this.DecimalPont;
        } else {
          this.total_received = '0.00';
        }
        if(response['final_balance'] && response['final_balance'] > 0){
          this.final_balance = response['final_balance']/this.DecimalPont;
        } else {
          this.final_balance = '0.00';
        }
      },
      error => {
        console.log(error, 'error');
      }
  )
    // this.service.getData().then((data) => {
    //   this.data = data;
    // });
  }


  // getBalance(bal:any){
  //   if(this.loading)
  //     return "Loading..";
  //     if(this.walletInfo && this.walletInfo[bal] && this.walletInfo > 0){
  //       return this.walletInfo[bal]/this.DecimalPont;
  //     } else {
  //       return '0.00'
  //     }
  // }

    toInt(num: string) {
        return +num;
    }

    sortByWordLength = (a: any) => {
        return a.city.length;
    }

    lgModalShow() {
      const activeModal = this.modalService.open(SendComponent, {size: 'lg'});
      activeModal.componentInstance.modalHeader = 'Large Modal';
    }
  
}
