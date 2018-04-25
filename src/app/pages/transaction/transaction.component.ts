import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SendModal } from './popup/send.component';

@Component({
  selector: 'data-tables',
  templateUrl: './dataTables.html',
  styleUrls: ['./dataTables.scss']
})
export class TransactionComponent {

    data;
    filterQuery = "";
    rowsOnPage = 10;
    sortBy = "email";
    sortOrder = "asc";
    walletInfo:Object;

    constructor(private service: TransactionService, private modalService: NgbModal) {
    this.service.getBalance().subscribe(
      response => {
        console.log(response);
        this.walletInfo = response;
        this.data = response.txs;
      },
      error => {
        console.log(error, 'error')
      }
  )
    // this.service.getData().then((data) => {
    //   this.data = data;
    // });
  }

    toInt(num: string) {
        return +num;
    }

    sortByWordLength = (a: any) => {
        return a.city.length;
    }

    lgModalShow() {
      const activeModal = this.modalService.open(SendModal, {size: 'lg'});
      activeModal.componentInstance.modalHeader = 'Large Modal';
    }
  
}
