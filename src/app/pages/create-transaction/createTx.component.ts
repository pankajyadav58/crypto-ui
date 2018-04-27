import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from './../transaction/transaction.service';
import {ToastsManager} from 'ng2-toastr';


@Component({
  selector: 'send-tx',
  templateUrl: './createTx.html',
  styleUrls: ['./createTx.scss'],
  providers: []
})
export class CreateTx {

  public form: FormGroup;
  public privatekey: AbstractControl;
  public toaddress: AbstractControl;
  public amount: AbstractControl;
  public submitted: boolean = false;
  transactionInfo: any;

  constructor(fb: FormBuilder, public router: Router, private service: TransactionService, public toastr: ToastsManager) {
    this.form = fb.group({
      'privatekey': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'toaddress': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'amount': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^-?\d+\.?\d*$/)])]
    });

    this.privatekey = this.form.controls['privatekey'];
    this.toaddress = this.form.controls['toaddress'];
    this.amount = this.form.controls['amount'];
  }

  send(values: any): void {
    this.submitted = true;
    if (this.form.valid) {
      try {
        values.amount = this.isCorrectValue(values.amount, true);
      } catch (e) {
        this.showError(e+"");
        return;
      }
      values.fromaddress = localStorage.getItem('btcAddress');
      this.service.send({ 'transaction': values }).subscribe(
        response => {
          this.showSuccess("Transaction ID: " + response);
          console.log(response);
          this.transactionInfo = response;
          this.router.navigate(['/app/transaction']);
        },
        error => {
          this.showError(error+"");
          console.log(error, 'error')
        })
    }
  }

  isCorrectValue(currency, throwError) {
    var parts = String(currency).trim().split('.');
    var amount = parts[0];
    var fraction;

    if (!throwError) throwError = false;

    function error(message) {
      var errorMsg = message;

      if (throwError) {
        throw errorMsg;
      } else {
        console.error(message);
        return false;
      }
    }

    if (amount == '') {
      return error('BTC amount can not be blank');
    }

    if (parts.length == 1) {
      // No fractional part
      fraction = '00000000';
    } else if (parts.length == 2) {
      if (parts[1].length > 8) {
        return error('BTC amount must not have more than 8 decimal places');
      } else if (parts[1].length <= 8) {
        // Less than eight decimal places
        fraction = parts[1];
      } else {
        // Trim extraneous decimal places
        fraction = parts[1].substring(0, 8);
      }
    } else {
      return error('BTC amount must have only one decimal point');
    }

    // Pad to eight decimal places
    for (var i = fraction.length; i < 8; i++) {
      fraction += '0';
    }

    // Check for zero amount
    if (amount == '0' && fraction == '00000000') {
      return error('BTC amount can not be zero');
    }

    // Combine whole with fractional part
    var result = amount + fraction;

    // In case there's a comma or something else in there.
    // At this point there should only be numbers.
    if (!/^\d+$/.test(result)) {
      return error('BTC amount contains non-numeric characters');
    }

    // Remove leading zeroes
    result = result.replace(/^0+/, '');

    return parseInt(result);
  }

  showSuccess(message:any) {
    this.toastr.success(message, 'Success!');
  }

  showError(message:any) {
    this.toastr.error(message, 'Oops!');
  }
}
