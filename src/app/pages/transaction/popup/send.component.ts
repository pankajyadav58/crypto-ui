import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {TransactionService} from './../transaction.service';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./send.component.scss')],
  templateUrl: './send.component.html'
})

export class SendModal implements OnInit {
 
  payload:any = {};
  modalHeader: string;
  modalContent: string = `Lorem ipsum dolor sit amet,
   consectetuer adipiscing elit, sed diam nonummy
   nibh euismod tincidunt ut laoreet dolore magna aliquam
   erat volutpat. Ut wisi enim ad minim veniam, quis
   nostrud exerci tation ullamcorper suscipit lobortis
   nisl ut aliquip ex ea commodo consequat.`;

  constructor(private activeModal: NgbActiveModal, private servive: TransactionService) {
  }

  ngOnInit() {}
  transactionInfo = {};
  closeModal() {
    this.activeModal.close();
  }

  send() {
    console.log(this.payload);
    this.payload.amount = parseInt(this.payload.amount);
    this.payload.fromaddress = localStorage.getItem('btcAddress');
    this.servive.send({'transaction': this.payload}).subscribe(
      response => {
        console.log(response);
        this.transactionInfo = response;
      },
      error => {
        console.log(error, 'error')
      }
  )

  }
}
